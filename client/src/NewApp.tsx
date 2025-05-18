import { useState, useEffect } from "react";
import { GameProvider } from "./game/gameStore";
import { PlayerRole } from "./game/gameTypes";
import { ROLE_DESCRIPTIONS } from "./game/gameConstants";
import { IntroScreen, RoleSelectionScreen, GameScreen } from "./components";
import { Toaster } from "sonner";
import "@fontsource/inter";
import "./index.css";

function NewApp() {
  // Estados do jogo
  const [gameStarted, setGameStarted] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [selectedRole, setSelectedRole] = useState<PlayerRole | null>(null);

  // Verificar se o jogador já jogou antes
  useEffect(() => {
    const savedGame = localStorage.getItem('agronegocio_poder_game');
    if (savedGame) {
      try {
        const parsedGame = JSON.parse(savedGame);
        // Se o jogo foi salvo, recuperar o nome e papel do jogador
        setPlayerName(parsedGame.playerName || "");
        setSelectedRole(parsedGame.playerRole || null);
        // Pular introdução e seleção de papel
        setIntroCompleted(true);
        setGameStarted(true);
      } catch (error) {
        console.error("Erro ao carregar jogo salvo:", error);
      }
    }
  }, []);

  // Função para iniciar o jogo após selecionar o papel
  const startGame = () => {
    if (playerName.trim() && selectedRole) {
      setGameStarted(true);
    }
  };

  // Função para completar a introdução
  const completeIntro = () => {
    setIntroCompleted(true);
  };

  // Resetar o jogo (para testes)
  const resetGame = () => {
    localStorage.removeItem('agronegocio_poder_game');
    setGameStarted(false);
    setIntroCompleted(false);
    setSelectedRole(null);
    window.location.reload();
  };

  // Renderizar a tela de introdução
  if (!introCompleted) {
    return <IntroScreen onComplete={completeIntro} />;
  }

  // Renderizar a tela de seleção de papel
  if (!gameStarted) {
    return (
      <RoleSelectionScreen
        playerName={playerName}
        selectedRole={selectedRole}
        onNameChange={(name) => setPlayerName(name)}
        onRoleSelect={(role) => setSelectedRole(role)}
        onStartGame={startGame}
        roleDescriptions={ROLE_DESCRIPTIONS}
      />
    );
  }

  // Renderizar o jogo principal
  return (
    <>
      {playerName && selectedRole ? (
        <GameProvider
          initialPlayerName={playerName}
          initialPlayerRole={selectedRole}
        >
          <GameScreen onReset={resetGame} />
          <Toaster position="top-right" />
        </GameProvider>
      ) : (
        <div className="flex items-center justify-center h-screen bg-red-100">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao iniciar o jogo</h1>
            <p className="mb-4">Não foi possível iniciar o jogo corretamente. Por favor, reinicie.</p>
            <button
              onClick={resetGame}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NewApp;