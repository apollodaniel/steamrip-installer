import { useState } from "react";
import { GameInfo, Runner } from "../types";
import { Play, Settings, FileText } from "lucide-react";

interface Props {
  gameData: GameInfo;
  runners: Runner[];
  selectedRunner: Runner | null;
  onRunnerSelect: (runner: Runner) => void;
  selectedExecutable: string;
  onExecutableSelect: (exe: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepConfig({
  gameData,
  runners,
  selectedRunner,
  onRunnerSelect,
  selectedExecutable,
  onExecutableSelect,
  onNext,
  onBack,
}: Props) {
  const [showReadme, setShowReadme] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Configuration</h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Executable Selection */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700">
          <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
            <Play className="w-4 h-4" /> Game Executable
          </label>
          <select
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500"
            value={selectedExecutable}
            onChange={(e) => onExecutableSelect(e.target.value)}
          >
            {gameData.executables.map((exe) => (
              <option key={exe} value={exe}>
                {exe}
              </option>
            ))}
          </select>
        </div>

        {/* Runner Selection */}
        <div className="bg-gray-900 p-4 rounded border border-gray-700">
          <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Runner (Proton/Wine)
          </label>
          <select
            className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-purple-500"
            value={selectedRunner ? JSON.stringify(selectedRunner) : ""}
            onChange={(e) => {
              if (e.target.value) onRunnerSelect(JSON.parse(e.target.value));
            }}
          >
            <option value="">Select a Runner...</option>
            {runners.map((runner, i) => (
              <option key={i} value={JSON.stringify(runner)}>
                {runner.name}
              </option>
            ))}
          </select>
          {runners.length === 0 && (
            <p className="text-red-400 text-xs mt-2">
              No runners found! Check Heroic configuration.
            </p>
          )}
        </div>
      </div>

      {/* Readme Toggle */}
      {gameData.readme && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowReadme(!showReadme)}
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <FileText className="w-4 h-4" /> {showReadme ? "Hide" : "Show"}{" "}
            Instructions
          </button>
        </div>
      )}

      {/* Readme Modal/Area */}
      {showReadme && gameData.readme && (
        <div className="bg-black/50 p-4 rounded border border-gray-600 h-64 overflow-y-auto font-mono text-xs whitespace-pre-wrap">
          {gameData.readme}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-200"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedRunner || !selectedExecutable}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 rounded text-white font-medium"
        >
          Install
        </button>
      </div>
    </div>
  );
}
