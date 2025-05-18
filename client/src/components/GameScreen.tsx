import { useState } from "react";
import { useGameState } from "../game/gameStore";
import { 
  GameHeader, 
  ResourceDisplay, 
  TerritoriesMap, 
  EventPanel, 
  ActionPanel, 
  StatisticsPanel, 
  GameOverScreen,
  IntroScreen
} from ".";

interface GameScreenProps {
  onReset: () => void;
}

export default function GameScreen({ onReset }: GameScreenProps) {
  const { state, dispatch } = useGameState();
  const [activeTab, setActiveTab] = useState<"map" | "stats">("map");
  const [showEventPanel, setShowEventPanel] = useState(
    state.activeEvents.length > 0
  );
  const [showIntro, setShowIntro] = useState(false);

  // Avançar para o próximo ano
  const advanceYear = () => {
    if (state.activeEvents.length > 0) {
      alert("Resolva todos os eventos ativos antes de avançar para o próximo ano!");
      setShowEventPanel(true);
      return;
    }

    dispatch({ type: "ADVANCE_YEAR" });
    
    // Se surgirem novos eventos, mostrar o painel
    setTimeout(() => {
      if (state.activeEvents.length > 0) {
        setShowEventPanel(true);
      }
    }, 100);
  };

  // Função para mostrar a introdução
  const handleShowIntro = () => {
    console.log("GameScreen: Mostrando introdução...");
    setShowIntro(true);
  };

  // Função para fechar a introdução
  const handleCloseIntro = () => {
    console.log("GameScreen: Fechando introdução...");
    setShowIntro(false);
  };

  // Se o jogo terminou, mostrar tela de fim de jogo
  if (state.gameCompleted) {
    return (
      <GameOverScreen
        victory={state.victory}
        playerRole={state.playerRole}
        playerName={state.playerName}
        defeatReason={state.defeatReason}
        resources={state.resources}
        currentYear={state.currentYear}
        onReset={onReset}
      />
    );
  }

  // Se a introdução está sendo mostrada
  if (showIntro) {
    return <IntroScreen onComplete={handleCloseIntro} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho do jogo */}
      <GameHeader
        playerName={state.playerName}
        playerRole={state.playerRole}
        currentYear={state.currentYear}
        onRestart={onReset}
        onShowIntro={handleShowIntro}
      />

      {/* Barra de recursos */}
      <ResourceDisplay resources={state.resources} />

      {/* Conteúdo principal */}
      <div className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Painel principal (mapa ou estatísticas) */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow">
          {/* Abas */}
          <div className="flex border-b">
            <button
              className={`px-4 py-3 font-medium ${
                activeTab === "map"
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
              onClick={() => setActiveTab("map")}
            >
              Mapa de Territórios
            </button>
            <button
              className={`px-4 py-3 font-medium ${
                activeTab === "stats"
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
              onClick={() => setActiveTab("stats")}
            >
              Estatísticas
            </button>
          </div>

          {/* Conteúdo da aba */}
          <div className="p-4">
            {activeTab === "map" ? (
              <TerritoriesMap
                territories={state.territories}
                playerRole={state.playerRole}
                dispatch={dispatch}
              />
            ) : (
              <StatisticsPanel
                historicalData={state.historicalData}
                completedEvents={state.completedEvents}
                territories={state.territories}
                playerRole={state.playerRole}
                startYear={state.startYear}
                currentYear={state.currentYear}
              />
            )}
          </div>
        </div>

        {/* Painel de ações */}
        <div className="lg:col-span-1">
          <ActionPanel
            playerRole={state.playerRole}
            resources={state.resources}
            territories={state.territories}
            activeEvents={state.activeEvents}
            dispatch={dispatch}
            onAdvanceYear={advanceYear}
            onShowEvents={() => setShowEventPanel(true)}
          />
        </div>
      </div>

      {/* Painel de eventos */}
      {showEventPanel && state.activeEvents.length > 0 && (
        <EventPanel
          events={state.activeEvents}
          playerRole={state.playerRole}
          dispatch={dispatch}
          onClose={() => setShowEventPanel(false)}
        />
      )}
    </div>
  );
}