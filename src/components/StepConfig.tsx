import { useState, useEffect } from "react";
import { GameInfo, Runner } from "../types";
import {
  Play,
  Settings,
  FileText,
  ChevronRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface StepConfigProps {
  gameInfo: GameInfo;
  onNext: (runner: Runner, addToHeroic: boolean, exe: string) => void;
}

export const StepConfig = ({ gameInfo, onNext }: StepConfigProps) => {
  const [runners, setRunners] = useState<Runner[]>([]);
  const [loadingRunners, setLoadingRunners] = useState(true);
  const [selectedRunnerId, setSelectedRunnerId] = useState<string>("");
  const [addToHeroic, setAddToHeroic] = useState(true);
  const [selectedExecutable, setSelectedExecutable] = useState<string>(
    gameInfo.executables[0] || "",
  );

  useEffect(() => {
    const fetchRunners = async () => {
      try {
        const foundRunners = await window.api.getRunners();
        setRunners(foundRunners);
        if (foundRunners.length > 0) {
          // Prefer proton-ge or newest proton
          setSelectedRunnerId(foundRunners[0].path);
        }
      } catch (error) {
        console.error("Failed to fetch runners", error);
      } finally {
        setLoadingRunners(false);
      }
    };
    fetchRunners();
  }, []);

  const handleNext = () => {
    const runner = runners.find((r) => r.path === selectedRunnerId);
    if (runner) {
      onNext(runner, addToHeroic, selectedExecutable);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Configuration
        </h2>
        <p className="text-gray-400">Setup compatibility and options</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {/* Executable Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Play size={16} className="text-blue-400" /> Game Executable
          </label>
          <select
            className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-blue-500 focus:outline-none"
            value={selectedExecutable}
            onChange={(e) => setSelectedExecutable(e.target.value)}
          >
            {gameInfo.executables.map((exe) => (
              <option key={exe} value={exe}>
                {exe}
              </option>
            ))}
          </select>
        </div>

        {/* Runner Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Settings size={16} className="text-purple-400" /> Compatibility
            Tool
          </label>

          {loadingRunners ? (
            <div className="flex items-center gap-2 text-gray-400 p-3 bg-black/20 rounded">
              <Loader2 className="animate-spin" size={16} /> Loading runners...
            </div>
          ) : (
            <select
              value={selectedRunnerId}
              onChange={(e) => setSelectedRunnerId(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-purple-500 focus:outline-none"
            >
              {runners.map((r) => (
                <option key={r.path} value={r.path}>
                  {r.name}
                </option>
              ))}
            </select>
          )}

          {runners.length === 0 && !loadingRunners && (
            <div className="text-red-400 text-xs flex items-center gap-1">
              <AlertCircle size={12} /> No runners found. Please install Wine or
              Proton (via Heroic/Steam).
            </div>
          )}
        </div>

        {/* Heroic Option */}
        <div className="bg-white/5 p-4 rounded-lg flex items-start gap-3 border border-white/5 hover:border-purple-500/50 transition-colors">
          <input
            type="checkbox"
            id="heroicCheck"
            checked={addToHeroic}
            onChange={(e) => setAddToHeroic(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-gray-600 bg-black/40 text-purple-600 focus:ring-purple-500"
          />
          <label
            htmlFor="heroicCheck"
            className="cursor-pointer select-none flex-1"
          >
            <div className="font-medium text-white">
              Add to Heroic Games Launcher
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Creates a sideload entry in your library automatically.
            </div>
          </label>
        </div>

        {/* Readme Section */}
        {gameInfo.readme && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FileText size={16} className="text-gray-400" /> Instructions
            </label>
            <div className="h-48 bg-black/40 rounded border border-white/10 p-3 text-xs font-mono text-gray-300 overflow-y-auto whitespace-pre-wrap">
              {gameInfo.readme}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!selectedRunnerId || loadingRunners}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg shadow-lg shadow-purple-900/20 font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          Install Game <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
