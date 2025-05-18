import { useState } from "react";

interface GameMenuProps {
  onRestart: () => void;
  onShowIntro: () => void;
}

export default function GameMenu({ onRestart, onShowIntro }: GameMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleRestart = () => {
    if (window.confirm("Tem certeza que deseja reiniciar o jogo? Todo o progresso será perdido.")) {
      console.log("Reiniciando jogo...");
      onRestart();
      setIsOpen(false);
    }
  };

  const handleShowIntro = () => {
    console.log("Mostrando introdução...");
    onShowIntro();
    setIsOpen(false);
  };

  return (
    <div className="relative z-20">
      {/* Botão do menu */}
      <button
        onClick={toggleMenu}
        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md flex items-center transition-colors shadow-md"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span className="ml-2">Menu</span>
      </button>

      {/* Dropdown do menu */}
      {isOpen && (
        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={handleShowIntro}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <div className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Mostrar Introdução
              </div>
            </button>

            <button
              onClick={handleRestart}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <div className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Reiniciar Jogo
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Overlay para fechar o menu ao clicar fora */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}