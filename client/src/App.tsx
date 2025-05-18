import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { GameProvider } from "./game/store";
import GameLayout from "./components/GameLayout";
import TutorialModal from "./components/TutorialModal";
import { Toaster } from "sonner";
import "@fontsource/inter";
import "./index.css";

// Importamos o GameRole do arquivo de tipos
import { GameRole } from "./game/types";

function App() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [farmName, setFarmName] = useState("");
  const [selectedRole, setSelectedRole] = useState<GameRole>(GameRole.FAMILY_FARMER);

  // Check if player has played before
  useEffect(() => {
    const savedGame = localStorage.getItem('agronegocio_game');
    if (savedGame) {
      // Game exists, don't show tutorial by default
      setGameStarted(true);
    } else {
      // New game, show tutorial
      setShowTutorial(true);
    }
  }, []);

  const startGame = () => {
    if (selectedRole && farmName.trim()) {
      setGameStarted(true);
      setShowTutorial(false);
    }
  };

  // Landing screen with start game option
  if (!gameStarted) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-green-800 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">Agronegócio e Poder</h1>
          <p className="text-gray-700 mb-8 text-center">
            O Jogo da Hegemonia: Explore como o agronegócio se consolidou no Brasil, influenciando políticas, sociedade e cultura.
          </p>
          
          <div className="space-y-4 mb-6">
            <label className="block text-sm font-medium text-gray-700">Nome da sua fazenda</label>
            <input 
              type="text" 
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              placeholder="Fazenda Esperança"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div className="space-y-4 mb-6">
            <label className="block text-sm font-medium text-gray-700">Escolha seu papel</label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedRole(GameRole.AGRIBUSINESS)}
                className={`p-3 border rounded-md text-left ${
                  selectedRole === GameRole.AGRIBUSINESS 
                    ? "border-green-500 bg-green-50 ring-2 ring-green-500" 
                    : "border-gray-300 hover:border-green-400"
                }`}
              >
                <h3 className="font-medium text-green-800">Grande Produtor Rural</h3>
                <p className="text-xs text-gray-600">Expanda monoculturas e maximize o lucro</p>
              </button>
              
              <button
                onClick={() => setSelectedRole(GameRole.FAMILY_FARMER)}
                className={`p-3 border rounded-md text-left ${
                  selectedRole === GameRole.FAMILY_FARMER 
                    ? "border-green-500 bg-green-50 ring-2 ring-green-500" 
                    : "border-gray-300 hover:border-green-400"
                }`}
              >
                <h3 className="font-medium text-green-800">Agricultor Familiar</h3>
                <p className="text-xs text-gray-600">Busque alternativas sustentáveis</p>
              </button>
              
              <button
                onClick={() => setSelectedRole(GameRole.POLITICIAN)}
                className={`p-3 border rounded-md text-left ${
                  selectedRole === GameRole.POLITICIAN 
                    ? "border-green-500 bg-green-50 ring-2 ring-green-500" 
                    : "border-gray-300 hover:border-green-400"
                }`}
              >
                <h3 className="font-medium text-green-800">Político/Legislador</h3>
                <p className="text-xs text-gray-600">Defina políticas e incentivos</p>
              </button>
              
              <button
                onClick={() => setSelectedRole(GameRole.ACTIVIST)}
                className={`p-3 border rounded-md text-left ${
                  selectedRole === GameRole.ACTIVIST 
                    ? "border-green-500 bg-green-50 ring-2 ring-green-500" 
                    : "border-gray-300 hover:border-green-400"
                }`}
              >
                <h3 className="font-medium text-green-800">Líder Sindical/Ativista</h3>
                <p className="text-xs text-gray-600">Lute por direitos e reforma fundiária</p>
              </button>
            </div>
          </div>
          
          <button
            onClick={startGame}
            disabled={!farmName.trim() || !selectedRole}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Começar Jogo
          </button>
          
          <div className="mt-4 text-center">
            <button 
              onClick={() => setShowTutorial(true)}
              className="text-green-600 hover:text-green-800 underline"
            >
              Ver Tutorial
            </button>
          </div>
        </div>
        
        {showTutorial && (
          <TutorialModal onClose={() => setShowTutorial(false)} />
        )}
      </div>
    );
  }

  // Main game
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider initialFarmName={farmName} selectedRole={selectedRole}>
        <GameLayout />
        {showTutorial && (
          <TutorialModal onClose={() => setShowTutorial(false)} />
        )}
        <Toaster position="top-right" />
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
