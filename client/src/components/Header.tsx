import { useState } from "react";
import { useGame } from "../game/store";
import { GameRole } from "../game/types";
import TutorialModal from "./TutorialModal";

interface HeaderProps {
  farmName: string;
}

export default function Header({ farmName }: HeaderProps) {
  const { state } = useGame();
  const [showTutorial, setShowTutorial] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Função para obter o nome do papel em português
  const getRoleName = (role: GameRole): string => {
    switch (role) {
      case GameRole.AGRIBUSINESS:
        return "Grande Produtor Rural";
      case GameRole.FAMILY_FARMER:
        return "Agricultor Familiar";
      case GameRole.POLITICIAN:
        return "Político/Legislador";
      case GameRole.ACTIVIST:
        return "Líder Sindical/Ativista";
      default:
        return "Desconhecido";
    }
  };

  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-2">Agronegócio e Poder</h1>
          <span className="text-green-300 hidden md:inline">|</span>
          <span className="text-green-300 ml-2 hidden md:inline">{farmName}</span>
          <span className="text-green-300 hidden md:inline ml-2">|</span>
          <span className="text-green-300 ml-2 hidden md:inline bg-green-700 px-2 py-1 rounded-md text-xs">
            {getRoleName(state.playerRole)}
          </span>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={() => {
                    setShowTutorial(true);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Tutorial
                </button>
                <button
                  onClick={() => {
                    if (confirm("Deseja realmente reiniciar o jogo? Todo progresso será perdido.")) {
                      localStorage.removeItem('agronegocio_game');
                      window.location.reload();
                    }
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  role="menuitem"
                >
                  Reiniciar Jogo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showTutorial && (
        <TutorialModal onClose={() => setShowTutorial(false)} />
      )}
    </header>
  );
}
