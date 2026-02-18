import { ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs-extra';
import { getRunners, moveGameFolder, runExecutable, Runner, addToHeroic } from './utils/runner';

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
        const name = path.basename(dirPath).replace(/[^\w\s.-]/g, ''); // Sanitize slightly
        
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

    ipcMain.handle('install-game', async (event, { sourcePath, gameName, executable, runner, addToHeroicLib }: { sourcePath: string, gameName: string, executable: string, runner: Runner, addToHeroicLib: boolean }) => {
        try {
            // 1. Move Directory
            const sender = event.sender;
            sender.send('install-progress', { stage: 'moving', message: 'Moving game files...' });
            
            const destPath = await moveGameFolder(sourcePath, gameName);
            
            // 2. Configure
            // executable provided is RELATIVE to sourcePath/destPath.
            const destExePath = path.join(destPath, executable);
            
            sender.send('install-progress', { stage: 'configuring', message: 'Configuring executables...' });
            
            // Ensure executable has execute permissions
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
                const redistName = path.basename(rExe);
                sender.send('install-progress', { stage: 'redist', message: `Installing ${redistName} (Check window)...` });
                sender.send('install-log', `> Running ${redistName}\n`);
                try {
                    const subprocess = await runExecutable(rExe, runner, pfxPath);
                    if (subprocess.stdout) sender.send('install-log', subprocess.stdout + '\n');
                    if (subprocess.stderr) sender.send('install-log', subprocess.stderr + '\n');
                } catch (e: any) {
                    console.error(`Failed to run redist ${rExe}:`, e);
                    sender.send('install-log', `[ERROR] Failed to run ${redistName}: ${e.message}\n`);
                    // We continue even if redist fails
                }
            }

            // 4. Add to Heroic (if requested)
            if (addToHeroicLib) {
                sender.send('install-progress', { stage: 'heroic', message: 'Adding to Heroic Games Launcher...' });
                try {
                    await addToHeroic(gameName, destPath, destExePath, runner, pfxPath);
                    sender.send('install-log', `> Added to Heroic Library successfully.\n`);
                } catch (e: any) {
                    console.error('Failed to add to heroic:', e);
                    sender.send('install-log', `[ERROR] Failed to add to Heroic: ${e.message}\n`);
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
        exec('helper-heroic-launch', () => { 
             // Just filtering the command, actual exec is below
        });
        // Actually we likely just want generic exec.
        // xdg-open heroic? or just `heroic` command.
        import('child_process').then(cp => {
             cp.exec('heroic', (err) => {
                 if (err) console.error('Failed to launch heroic:', err);
             });
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
