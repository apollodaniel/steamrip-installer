import fs from 'fs-extra';
import path from 'path';
import { app } from 'electron';
import { execa } from 'execa';

export interface Runner {
  name: string;
  path: string;
  type: 'proton' | 'wine';
}

const HEROIC_CONFIG_PATH = path.join(app.getPath('home'), '.config', 'heroic');
const HEROIC_TOOLS_PATH = path.join(HEROIC_CONFIG_PATH, 'tools');

export async function getRunners(): Promise<Runner[]> {
  const runners: Runner[] = [];
  const toolsPath = HEROIC_TOOLS_PATH;

  if (!await fs.pathExists(toolsPath)) {
    return runners;
  }

  // Check Proton
  const protonPath = path.join(toolsPath, 'proton');
  if (await fs.pathExists(protonPath)) {
    const dirs = await fs.readdir(protonPath);
    for (const dir of dirs) {
      if (dir.startsWith('.')) continue; // Skip hidden
      // Check for proton script
      const binPath = path.join(protonPath, dir, 'proton');
      if (await fs.pathExists(binPath)) {
        runners.push({
          name: `Proton - ${dir}`,
          path: binPath,
          type: 'proton'
        });
      } else {
        // Fallback: check for dist/bin/wine or similar if proton script missing? 
        // Usually proton builds have 'proton' script.
      }
    }
  }

  // Check Wine
  const winePath = path.join(toolsPath, 'wine');
  if (await fs.pathExists(winePath)) {
    const dirs = await fs.readdir(winePath);
    for (const dir of dirs) {
       if (dir.startsWith('.')) continue;
       const binPath = path.join(winePath, dir, 'bin', 'wine');
       if (await fs.pathExists(binPath)) {
         runners.push({
           name: `Wine - ${dir}`,
           path: binPath,
           type: 'wine'
         });
       }
    }
  }

  return runners;
}

export async function moveGameFolder(sourcePath: string, gameName: string): Promise<string> {
  const gamesDir = path.join(app.getPath('home'), 'Games');
  await fs.ensureDir(gamesDir);
  const destPath = path.join(gamesDir, gameName);
  
  if (await fs.pathExists(destPath)) {
    throw new Error(`Destination already exists: ${destPath}`);
  }

  await fs.move(sourcePath, destPath);
  return destPath;
}

// Executable runner with Prefix support
export async function runExecutable(executablePath: string, runner: Runner, pfxPath: string) {
    const env: NodeJS.ProcessEnv = {
        ...process.env,
        STEAM_COMPAT_DATA_PATH: pfxPath,
        WINEPREFIX: path.join(pfxPath, 'pfx'), // Proton uses this structure usually inside compatdata
    };

    // If using Wine, WINEPREFIX is direct. Proton uses STEAM_COMPAT_DATA_PATH which contains pfx.
    if (runner.type === 'wine') {
         env.WINEPREFIX = pfxPath;
         delete env.STEAM_COMPAT_DATA_PATH;
    }

    const cmd = runner.path;
    let args: string[] = [];

    if (runner.type === 'proton') {
        // Proton needs 'run' command usually
        // Also might need to set STEAM_COMPAT_CLIENT_INSTALL_PATH for some proton versions?
        args = ['run', executablePath];
    } else {
        args = [executablePath];
    }
    
    console.log(`Executing with ${runner.name} (${runner.type}): ${cmd} ${args.join(' ')}`);
    // ensure prefix dir exists
    await fs.ensureDir(pfxPath);
    
    return execa(cmd, args, { env });
}
