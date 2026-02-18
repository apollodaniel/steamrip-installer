import { useEffect, useState, useRef } from "react";
import { InstallProgress, Runner } from "../types";
import { Terminal, CheckCircle, Loader2, XCircle } from "lucide-react";

interface StepInstallProps {
  gamePath: string;
  gameName: string;
  executable: string;
  runner: Runner;
  addToHeroicProp: boolean;
  onNext: (installedPath: string) => void;
}

export const StepInstall = ({
  gamePath,
  gameName,
  executable,
  runner,
  addToHeroicProp,
  onNext,
}: StepInstallProps) => {
  const [progress, setProgress] = useState<InstallProgress>({
    stage: "moving",
    message: "Starting...",
  });
  const [logs, setLogs] = useState<string[]>([]);
  const [installing, setInstalling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const destPathRef = useRef<string>("");

  useEffect(() => {
    if (installing) return;
    setInstalling(true);

    const cleanupProgress = window.api.onInstallProgress((p) => {
      setProgress(p);
      if (p.stage === "done") {
        setTimeout(() => {
          if (destPathRef.current) onNext(destPathRef.current);
        }, 1000);
      }
    });

    const cleanupLogs = window.api.onInstallLog((log) => {
      setLogs((prev) => [...prev, log]);
    });

    window.api
      .installGame({
        sourcePath: gamePath,
        gameName,
        executable,
        runner,
        addToHeroicLib: addToHeroicProp,
      })
      .then((res) => {
        destPathRef.current = res.path;
      })
      .catch((err) => {
        setLogs((prev) => [...prev, `[CRITICAL ERROR] ${err.message}`]);
        setError(err.message);
      });

    return () => {
      cleanupProgress();
      cleanupLogs();
    };
  }, [gamePath, gameName, executable, runner, addToHeroicProp, onNext]);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 text-red-500 animate-in fade-in zoom-in duration-300">
        <XCircle size={48} />
        <h2 className="text-xl font-bold">Installation Failed</h2>
        <p className="text-center max-w-md bg-red-500/10 p-4 rounded border border-red-500/20">
          {error}
        </p>
        <button
          onClick={() => destPathRef.current && onNext(destPathRef.current)}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Continue anyway
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
          Installing
        </h2>
        <p className="text-gray-400">{gameName}</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        {/* Progress Circle/Stage */}
        <div className="flex flex-col items-center space-y-4">
          {progress.stage === "done" ? (
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
              <CheckCircle size={32} />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 animate-pulse">
              <Loader2 size={32} className="animate-spin" />
            </div>
          )}
          <div className="text-xl font-medium">{progress.message}</div>
        </div>

        {/* Logs Terminal */}
        <div className="w-full max-w-2xl bg-black/50 rounded-lg border border-white/10 overflow-hidden flex flex-col h-64 shadow-2xl">
          <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/5">
            <Terminal size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400 font-mono">
              Installation Log
            </span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-gray-300 space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="break-all whitespace-pre-wrap">
                {log}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
