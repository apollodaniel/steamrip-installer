import { GameInfo } from "../types";
import { FolderOpen } from "lucide-react";

interface Props {
  onNext: (info: GameInfo) => void;
}

export const StepSelection = ({ onNext }: Props) => {
  const handleSelect = async () => {
    try {
      const result = await window.api.selectDirectory();
      if (result) {
        onNext(result);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to select directory");
    }
  };

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Select Game Folder
      </h2>
      <p className="text-gray-400">
        Choose the folder containing the downloaded SteamRIP game.
      </p>

      <button
        onClick={handleSelect}
        className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 mx-auto"
      >
        <FolderOpen className="w-6 h-6" />
        <span className="font-medium text-lg">Browse Folder</span>
      </button>

      <div className="mt-8 p-4 bg-gray-900/50 rounded border border-gray-700 max-w-sm mx-auto text-sm text-gray-500">
        Supported formats: Folders containing an executable and typically a
        _CommonRedist folder.
      </div>
    </div>
  );
};
