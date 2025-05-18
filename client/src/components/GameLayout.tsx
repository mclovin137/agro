import { useState, useEffect } from "react";
import { useGameState } from "../game/gameStore";
import { PlayerRole, ResourceType } from "../game/gameTypes";
import GameHeader from "./GameHeader";
import EventPanel from "./EventPanel";
import ResourceDisplay from "./ResourceDisplay";
import TutorialModal from "./TutorialModal";
import NewsFeed from "./NewsFeed";
import { toast } from "sonner";

export default function GameLayout() {
  const { state, dispatch } = useGameState();
  const [showEvents, setShowEvents] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Check if this is a new game and show tutorial
  useEffect(() => {
    const tutorialShown = localStorage.getItem('tutorial_shown');
    if (!tutorialShown && state.currentYear === state.startYear) {
      setShowTutorial(true);
    }
  }, []);
  
  // Function to close tutorial and save that it was shown
  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorial_shown', 'true');
  };
  
  // Check for active events when they change
  useEffect(() => {
    if (state.activeEvents && state.activeEvents.length > 0) {
      setShowEvents(true);
      toast.info(`Você tem ${state.activeEvents.length} eventos para resolver!`);
    }
  }, [state.activeEvents?.length]);

  const advanceYear = () => {
    // Check if there are unresolved events
    if (state.activeEvents && state.activeEvents.length > 0) {
      toast.warning("Você precisa resolver todos os eventos antes de avançar!", {
        duration: 3000,
      });
      setShowEvents(true);
      return;
    }

    // Advance the year
    dispatch({ type: "ADVANCE_YEAR" });
    
    // Show notification about new year
    toast.success(`Ano ${state.currentYear + 1} começou!`, {
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <GameHeader 
        playerName={state.playerName}
        playerRole={state.playerRole}
        currentYear={state.currentYear}
      />
      
      <ResourceDisplay resources={state.resources} />
      
      {/* Layout redesenhado com grid para maior controle */}
      <div className="grid grid-cols-12 gap-4 flex-1 p-3 bg-green-50">
        {/* Área de territórios (8 colunas) */}
        <div className="col-span-8 bg-white rounded-lg shadow-md p-4">
          <div className="mb-3 flex justify-between items-center">
            <h2 className="text-lg font-medium text-green-800">
              {state.playerRole === PlayerRole.AGRIBUSINESS ? "Suas Propriedades Rurais" : 
               state.playerRole === PlayerRole.FAMILY_FARMER ? "Suas Terras Familiares" :
               state.playerRole === PlayerRole.POLITICIAN ? "Sua Esfera de Influência" :
               state.playerRole === PlayerRole.ACTIVIST ? "Seus Movimentos de Base" : 
               "Seus Territórios"}
            </h2>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (state.activeEvents && state.activeEvents.length > 0) {
                    setShowEvents(true);
                  } else {
                    toast.info("Não há eventos para resolver no momento", { duration: 2000 });
                  }
                }}
                className={`px-2 py-1 rounded-lg font-medium transition-colors text-xs ${
                  state.activeEvents && state.activeEvents.length > 0 
                    ? "bg-amber-500 hover:bg-amber-600 text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {state.activeEvents && state.activeEvents.length > 0 
                  ? `Eventos (${state.activeEvents.length})` 
                  : "Nenhum Evento"}
              </button>
              
              <button
                onClick={advanceYear}
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-lg font-medium transition-colors text-xs"
              >
                Avançar Ano
              </button>
            </div>
          </div>
          
          {/* Placeholder para o mapa de territórios */}
          <div className="bg-green-50 p-8 rounded-lg text-center border-2 border-dashed border-green-200">
            <p className="text-gray-600">
              Aqui será exibido o mapa dos territórios. Atualmente há {state.territories.length} territórios no jogo.
            </p>
          </div>
        </div>
        
        {/* Painel de controle (4 colunas) */}
        <div className="col-span-4 space-y-4">
          {/* Componente de Notícias */}
          <NewsFeed 
            events={state.completedEvents || []} 
            playerRole={state.playerRole}
            maxItems={10}
          />
          
          {/* Painel Principal */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-100 p-3 border-b border-green-200 rounded-t-lg">
              <h2 className="text-lg font-bold text-green-800">Painel de Controle</h2>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-3">Informações do Jogador</h3>
              <p className="text-gray-600">Nome: {state.playerName}</p>
              <p className="text-gray-600">Papel: {state.playerRole}</p>
              <p className="text-gray-600">Ano Atual: {state.currentYear}</p>
              
              <h3 className="font-medium text-gray-800 mt-5 mb-3">Recursos</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">Econômico: {state.resources[ResourceType.ECONOMIC]}</li>
                <li className="text-gray-600">Influência: {state.resources[ResourceType.INFLUENCE]}</li>
                <li className="text-gray-600">Social: {state.resources[ResourceType.SOCIAL]}</li>
                <li className="text-gray-600">Ambiental: {state.resources[ResourceType.ENVIRONMENTAL]}</li>
              </ul>
              
              <div className="mt-6">
                <button
                  onClick={advanceYear}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-all"
                >
                  Avançar para o Próximo Ano
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event panel */}
      {showEvents && state.activeEvents && state.activeEvents.length > 0 && (
        <EventPanel 
          events={state.activeEvents} 
          playerRole={state.playerRole}
          dispatch={dispatch}
          onClose={() => setShowEvents(false)} 
        />
      )}
      
      {/* Tutorial Modal */}
      {showTutorial && <TutorialModal onClose={closeTutorial} />}
      
      {/* Ajuda rápida */}
      <div className="fixed bottom-4 right-4 z-10">
        <button 
          onClick={() => setShowTutorial(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg"
          title="Mostrar ajuda"
        >
          ?
        </button>
      </div>
    </div>
  );
}
