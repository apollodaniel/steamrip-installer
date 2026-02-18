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

const SIDELOAD_LIBRARY_PATH = path.join(HEROIC_CONFIG_PATH, 'sideload_apps', 'library.json');

export async function moveGameFolder(sourcePath: string, gameName: string): Promise<string> {
  const gamesDir = path.join(app.getPath('home'), 'Games');
  await fs.ensureDir(gamesDir);
  const destPath = path.join(gamesDir, gameName);
  
  if (await fs.pathExists(destPath)) {
    // If it exists, maybe we should ask user? Or overwrite? 
    // For now, let's just append a timestamp or throw descriptive error.
    // The user moved it "somehow", implying they might have retried.
    // Let's try to identify if it's the SAME installation.
    throw new Error(`Destination already exists: ${destPath}. Please delete it or rename your game folder.`);
  }

  try {
      await fs.move(sourcePath, destPath, { overwrite: true });
  } catch (err: any) {
      if (err.code === 'EXDEV') {
          // Cross-device move failed for some reason even with fs-extra? 
          // Should not happen with fs.move but let's be explicit fallback
          await fs.copy(sourcePath, destPath, { overwrite: true });
          await fs.remove(sourcePath);
      } else {
          throw err;
      }
  }
  return destPath;
}

export async function addToHeroic(gameName: string, gamePath: string, executablePath: string, runner: Runner, pfxPath: string) {
    // Construct the Heroic Sideload entry
    // Format inferred/standard for Heroic 2.x+
    const entry = {
        title: gameName,
        appName: `Sideload-${gameName.replace(/\s+/g, '_')}-${Date.now()}`,
        install: {
            version: '1.0.0',
            executable: executablePath, // Full path usually preferred?
            workingDir: gamePath,
            platform: 'windows',
        },
        runner: runner.path, // Full path to runner binary
        wineVersion: {
            bin: runner.path,
            name: runner.name,
            type: runner.type
            // winetricks?
        },
        pfx: pfxPath,
    };

    // Heroic Sideload format might be just a list in library.json
    // Or it might need a separate file? current heroic versions use library.json in sideload_apps.
    
    // Read existing
    let library: { games: any[] } = { games: [] };
    try {
        if (await fs.pathExists(SIDELOAD_LIBRARY_PATH)) {
            library = await fs.readJson(SIDELOAD_LIBRARY_PATH);
        }
    } catch (e) {
        // failed to read, start fresh
    }

    // Append
    library.games.push(entry);

    // Save
    await fs.writeJson(SIDELOAD_LIBRARY_PATH, library, { spaces: 2 });
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
    
    // For Proton, we sometimes need more envs to simulate Steam
    if (runner.type === 'proton') {
        env.SteamGameId = 'nonsteam';
    }

    const cmd = runner.path;
    let args: string[] = [];

    if (runner.type === 'proton') {
        // Proton needs 'run' command usually
        args = ['run', executablePath];
    } else {
        args = [executablePath];
    }
    
    console.log(`Executing with ${runner.name} (${runner.type}): ${cmd} ${args.join(' ')}`);
    // ensure prefix dir exists
    await fs.ensureDir(pfxPath);
    
    const subprocess = execa(cmd, args, { env });
    
    // Pipe output to console so we can debug
    subprocess.stdout?.pipe(process.stdout);
    subprocess.stderr?.pipe(process.stderr);
    
    return subprocess;
}
