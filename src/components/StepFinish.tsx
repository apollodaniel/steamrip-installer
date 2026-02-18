import { CheckCircle, ExternalLink } from "lucide-react";

interface Props {
  Path: string;
}

export default function StepFinish({ Path }: Props) {
  const handleOpenHeroic = async () => {
    try {
      await window.api.openHeroic();
    } catch (e) {
      console.error(e);
      alert("Failed to open Heroic");
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
      </div>

      <h2 className="text-2xl font-bold text-green-400">
        Installation Successful!
      </h2>
      <p className="text-gray-300">
        Game installed to{" "}
        <code className="bg-gray-700 px-2 py-1 rounded">{Path}</code>
      </p>

      <div className="pt-8">
        <button
          onClick={handleOpenHeroic}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg shadow-lg flex items-center justify-center gap-3 transition-opacity mx-auto"
        >
          <ExternalLink className="w-5 h-5" />
          Open Heroic Games Launcher
        </button>
      </div>
    </div>
  );
}
