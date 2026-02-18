import { ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs-extra';
import { getRunners, moveGameFolder, runExecutable, Runner } from './utils/runner';

export function setupHandlers() {
    ipcMain.handle('get-runners', async () => {
        try {
            return await getRunners();
        } catch (error) {
            console.error('Failed to get runners:', error);
            return [];
        }
    });

    ipcMain.handle('select-directory', async () => {
        const result = await dialog.showOpenDialog({
            properties: ['openDirectory'],
        });
        if (result.canceled || result.filePaths.length === 0) {
            return null;
        }
        const dirPath = result.filePaths[0];
        const name = path.basename(dirPath);
        
        // Find executables
        const executables = await findExecutables(dirPath);
        // Find readme
        const readme = await findReadme(dirPath);

        return {
            path: dirPath,
            name,
            executables,
            readme
        };
    });

    ipcMain.handle('install-game', async (event, { sourcePath, gameName, executable, runner }: { sourcePath: string, gameName: string, executable: string, runner: Runner }) => {
        try {
            // 1. Move Directory
            // Send progress update via webContents if possible, or return generator/stream?
            // IPC handle returns promise, so we can't emit events easily unless we use event.sender.send
            const sender = event.sender;
            sender.send('install-progress', { stage: 'moving', message: 'Moving game files...' });
            
            const destPath = await moveGameFolder(sourcePath, gameName);
            
            // 2. Configure (chmod +x if needed)
            // Windows EXEs don't need chmod +x on Linux usually if run via Wine/Proton? 
            // Actually, newer Proton/Wine might check execute bit, but usually not for PE files.
            // But let's verify if executable is relative path.
            // executable is likely relative to sourcePath. 
            // We need to resolve it to destPath.
            // Wait, front-end should send relative path? Or full path?
            // If full path of source, we need to re-calculate for dest.
            
            // Let's assume executable provided is RELATIVE to sourcePath.
            const destExePath = path.join(destPath, executable);
            
            sender.send('install-progress', { stage: 'configuring', message: 'Configuring executables...' });
            
            // Ensure executable has execute permissions (helper for Linux native or Wine script)
            if (await fs.pathExists(destExePath)) {
                await fs.chmod(destExePath, '755');
            }
            
            // Create Prefix Directory
            const pfxPath = path.join(destPath, 'pfx');
            await fs.ensureDir(pfxPath);
            
            // 3. Install Redists
            sender.send('install-progress', { stage: 'redist', message: 'Searching for redistributables...' });
            
            const commonRedistPath = path.join(destPath, '_CommonRedist');
            const redistPath = path.join(destPath, 'Redist');
            
            const redistDirs = [commonRedistPath, redistPath];
            const redistExes: string[] = [];
            
            for (const rDir of redistDirs) {
                if (await fs.pathExists(rDir)) {
                     const files = await FindRedistExecutables(rDir);
                     redistExes.push(...files);
                }
            }
            
            for (const rExe of redistExes) {
                sender.send('install-progress', { stage: 'redist', message: `Installing ${path.basename(rExe)}...` });
                try {
                    await runExecutable(rExe, runner, pfxPath);
                } catch (e) {
                    console.error(`Failed to run redist ${rExe}:`, e);
                    // Continue anyway? Usually yes.
                }
            }
            
            sender.send('install-progress', { stage: 'done', message: 'Installation complete!' });
            return { success: true, path: destPath };
            
        } catch (error: unknown) {
            console.error('Installation failed:', error);
             throw error;
        }
    });

    ipcMain.handle('open-heroic', () => {
        exec('heroic', (err) => {
             if (err) {
                 // Try xdg-open or verify command
                 console.error('Failed to launch heroic directly, trying generic open? No, heroic is command usually.');
                 // Maybe check standard paths?
             }
        });
    });
}

// Helper to find executables recursively
async function findExecutables(dir: string): Promise<string[]> {
    const exes: string[] = [];
    async function search(currentDir: string) {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                if (entry.name === 'pfx' || entry.name === '_CommonRedist' || entry.name === 'Redist') continue;
                await search(fullPath);
            } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.exe')) {
                // Return relative path to dir
                exes.push(path.relative(dir, fullPath));
            }
        }
    }
    await search(dir);
    return exes;
}

async function FindRedistExecutables(dir: string): Promise<string[]> {
      const exes: string[] = [];
    async function search(currentDir: string) {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                 await search(fullPath);
            } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.exe')) {
                exes.push(fullPath);
            }
        }
    }
    await search(dir);
    return exes;
}


async function findReadme(dir: string): Promise<string | null> {
     // Look for Read_Me_Instructions.txt or similar
     const candidates = ['Read_Me_Instructions.txt', 'README.txt', 'readme.txt'];
     for (const c of candidates) {
         const p = path.join(dir, c);
         if (await fs.pathExists(p)) {
             return fs.readFile(p, 'utf-8');
         }
     }
     return null;
}

import { exec } from 'child_process';
