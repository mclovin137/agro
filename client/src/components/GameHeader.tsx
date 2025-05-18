import { PlayerRole } from "../game/gameTypes";
import GameMenu from "./GameMenu";

interface GameHeaderProps {
  playerName: string;
  playerRole: PlayerRole;
  currentYear: number;
  onRestart?: () => void;
  onShowIntro?: () => void;
}

export default function GameHeader({ 
  playerName, 
  playerRole, 
  currentYear,
  onRestart,
  onShowIntro
}: GameHeaderProps) {
  // Função para obter o título baseado no papel do jogador
  const getRoleTitle = (role: PlayerRole): string => {
    switch (role) {
      case PlayerRole.AGRIBUSINESS:
        return "Grande Produtor Rural";
      case PlayerRole.FAMILY_FARMER:
        return "Agricultor Familiar";
      case PlayerRole.POLITICIAN:
        return "Político/Legislador";
      case PlayerRole.ACTIVIST:
        return "Líder Sindical/Ativista";
      default:
        return "Desconhecido";
    }
  };

  // Obter cor específica para o papel do jogador
  const getRoleColor = (role: PlayerRole): string => {
    switch (role) {
      case PlayerRole.AGRIBUSINESS:
        return "bg-blue-700";
      case PlayerRole.FAMILY_FARMER:
        return "bg-green-700";
      case PlayerRole.POLITICIAN:
        return "bg-purple-700";
      case PlayerRole.ACTIVIST:
        return "bg-amber-700";
      default:
        return "bg-green-700";
    }
  };

  // Obter ícone para o papel do jogador
  const getRoleIcon = (role: PlayerRole): string => {
    switch (role) {
      case PlayerRole.AGRIBUSINESS:
        return "🏭";
      case PlayerRole.FAMILY_FARMER:
        return "🌱";
      case PlayerRole.POLITICIAN:
        return "🏛️";
      case PlayerRole.ACTIVIST:
        return "✊";
      default:
        return "❓";
    }
  };

  const roleColor = getRoleColor(playerRole);
  
  return (
    <header className="bg-gradient-to-r from-green-900 to-green-800 text-white shadow-lg border-b border-green-950">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row md:items-center">
          <h1 className="text-xl font-bold flex items-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 text-green-400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18.5L4 8.5L7 4H17L20 8.5L12 18.5Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.3" />
              <path d="M12 22L4 10L8 4H16L20 10L12 22Z" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            Agronegócio e Poder
          </h1>
          <div className="md:ml-4 flex items-center mt-1 md:mt-0">
            <span className="text-green-300/60">|</span>
            <span className="ml-2 text-sm flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              {playerName}
            </span>
            <span className="mx-2 text-green-300/60">•</span>
            <span className={`text-sm ${roleColor} px-3 py-1 rounded-full flex items-center shadow-sm`}>
              <span className="mr-1.5">{getRoleIcon(playerRole)}</span>
              {getRoleTitle(playerRole)}
            </span>
          </div>
        </div>
        
        <div className="mt-2 md:mt-0 flex items-center space-x-3">
          <span className="text-sm bg-green-950/50 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center border border-green-800 shadow-inner">
            <svg className="w-4 h-4 mr-1.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Ano: <span className="font-semibold ml-1">{currentYear}</span>
          </span>
          
          {/* Botões simples */}
          <div className="flex gap-2">
            {onShowIntro && (
              <button 
                onClick={() => {
                  console.log("Botão de Introdução clicado");
                  onShowIntro();
                }}
                className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded-md flex items-center text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Intro
              </button>
            )}
            
            {onRestart && (
              <button 
                onClick={() => {
                  if (window.confirm("Tem certeza que deseja reiniciar o jogo? Todo o progresso será perdido.")) {
                    console.log("Botão de Reiniciar clicado");
                    onRestart();
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded-md flex items-center text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Reiniciar
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}