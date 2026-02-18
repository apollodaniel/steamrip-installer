import { useEffect, useState } from "react";
import { GameInfo, Runner, InstallProgress } from "../types";
import { Loader2, XCircle } from "lucide-react";

interface Props {
  gameData: GameInfo;
  runner: Runner;
  executable: string;
  onFinish: () => void;
}

export default function StepInstall({
  gameData,
  runner,
  executable,
  onFinish,
}: Props) {
  const [progress, setProgress] = useState<InstallProgress>({
    stage: "moving",
    message: "Starting installation...",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Listen for progress updates
    const removeListener = window.api.onInstallProgress((p) => {
      if (mounted) setProgress(p);
    });

    // Start installation
    window.api
      .installGame({
        sourcePath: gameData.path,
        gameName: gameData.name,
        executable: executable,
        runner: runner,
      })
      .then((result) => {
        if (mounted) {
          if (result.success) {
            onFinish();
          }
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Unknown error occurred");
      });

    return () => {
      mounted = false;
      removeListener();
    };
  }, [gameData, runner, executable, onFinish]);

  if (error) {
    return (
      <div className="text-center space-y-4">
        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-red-400">Installation Failed</h2>
        <p className="text-gray-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-8">
      <h2 className="text-2xl font-bold">Installing {gameData.name}</h2>

      <div className="flex justify-center">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
      </div>

      <div className="space-y-2">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden w-64 mx-auto">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: getProgressWidth(progress.stage) }}
          />
        </div>
        <p className="text-gray-400 animate-pulse">{progress.message}</p>
      </div>

      <div className="text-xs text-gray-600 font-mono">
        Runner: {runner.name}
      </div>
    </div>
  );
}

function getProgressWidth(stage: InstallProgress["stage"]): string {
  switch (stage) {
    case "moving":
      return "25%";
    case "configuring":
      return "50%";
    case "redist":
      return "75%";
    case "done":
      return "100%";
    default:
      return "0%";
  }
}
