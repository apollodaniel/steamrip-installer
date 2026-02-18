export interface Runner {
  name: string;
  path: string;
  type: 'proton' | 'wine';
}

export interface GameInfo {
  path: string;
  name: string;
  executables: string[];
  readme: string | null;
}

export interface InstallProgress {
  stage: 'moving' | 'configuring' | 'redist' | 'done';
  message: string;
}

declare global {
  interface Window {
    api: {
      getRunners(): Promise<Runner[]>;
      selectDirectory(): Promise<GameInfo | null>;
      installGame(payload: { sourcePath: string, gameName: string, executable: string, runner: Runner, addToHeroicLib: boolean }): Promise<{ success: true, path: string }>;
      openHeroic(): Promise<void>;
      onInstallProgress(callback: (progress: InstallProgress) => void): () => void;
      onInstallLog(callback: (log: string) => void): () => void;
    };
  }
}
