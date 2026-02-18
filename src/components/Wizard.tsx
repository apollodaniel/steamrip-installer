import { useState, useEffect, useCallback } from "react";
import { GameInfo, Runner } from "../types";
import StepSelection from "./StepSelection.tsx";
import StepConfig from "./StepConfig.tsx";
import StepInstall from "./StepInstall.tsx";
import StepFinish from "./StepFinish.tsx";

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [gameData, setGameData] = useState<GameInfo | null>(null);
  const [selectedRunner, setSelectedRunner] = useState<Runner | null>(null);
  const [selectedExecutable, setSelectedExecutable] = useState<string>("");
  const [runners, setRunners] = useState<Runner[]>([]);

  useEffect(() => {
    // Fetch runners on load
    window.api.getRunners().then(setRunners).catch(console.error);
  }, []);

  const handleNext = useCallback(() => setStep((s) => s + 1), []);
  const handleBack = useCallback(() => setStep((s) => s - 1), []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <header className="p-4 bg-gray-800 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          SteamRIP Installer
        </h1>
        <div className="text-sm text-gray-400">Step {step} of 4</div>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          {step === 1 && (
            <StepSelection
              onGameSelected={(data) => {
                setGameData(data);
                // Default to first exe if available
                if (data.executables.length > 0)
                  setSelectedExecutable(data.executables[0]);
                handleNext();
              }}
            />
          )}

          {step === 2 && gameData && (
            <StepConfig
              gameData={gameData}
              runners={runners}
              selectedRunner={selectedRunner}
              onRunnerSelect={setSelectedRunner}
              selectedExecutable={selectedExecutable}
              onExecutableSelect={setSelectedExecutable}
              onNext={() => {
                if (selectedRunner && selectedExecutable) handleNext();
              }}
              onBack={handleBack}
            />
          )}

          {step === 3 && gameData && selectedRunner && (
            <StepInstall
              gameData={gameData}
              runner={selectedRunner}
              executable={selectedExecutable}
              onFinish={handleNext}
            />
          )}

          {step === 4 && (
            <StepFinish Path={gameData ? `~/Games/${gameData.name}` : ""} />
          )}
        </div>
      </main>
    </div>
  );
}
