import { PlayerRole, ResourceType, Territory, GameEvent } from "../game/gameTypes";

interface ActionPanelProps {
  playerRole: PlayerRole;
  resources: Record<ResourceType, number>;
  territories: Territory[];
  activeEvents: GameEvent[];
  dispatch: React.Dispatch<any>;
  onAdvanceYear: () => void;
  onShowEvents: () => void;
}

export default function ActionPanel({
  playerRole,
  resources,
  territories,
  activeEvents,
  dispatch,
  onAdvanceYear,
  onShowEvents
}: ActionPanelProps) {
  // Verificar se há territórios controlados pelo jogador
  const playerTerritories = territories.filter(t => t.owner === playerRole);
  
  // Realizar campanha política
  const conductPoliticalCampaign = () => {
    if (resources[ResourceType.ECONOMIC] < 200) {
      alert("Recursos econômicos insuficientes! Você precisa de 200 para realizar uma campanha política.");
      return;
    }
    
    dispatch({ type: "CONDUCT_POLITICAL_CAMPAIGN" });
  };
  
  // Organizar movimento social
  const organizeSocialMovement = () => {
    if (resources[ResourceType.ECONOMIC] < 100) {
      alert("Recursos econômicos insuficientes! Você precisa de 100 para organizar um movimento social.");
      return;
    }
    
    dispatch({ type: "ORGANIZE_SOCIAL_MOVEMENT" });
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Ações</h2>
      
      {/* Status */}
      <div className="mb-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">Status</h3>
          <div className="text-sm">
            <div className="flex items-center justify-between mb-1">
              <span>Territórios:</span>
              <span className="font-medium">{playerTerritories.length}</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span>Eventos ativos:</span>
              <span className="font-medium">{activeEvents.length}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ações principais */}
      <div className="space-y-2 mb-4">
        <h3 className="font-medium text-gray-700">Ações Principais</h3>
        
        {/* Ações específicas por papel */}
        {playerRole === PlayerRole.AGRIBUSINESS && (
          <button
            onClick={conductPoliticalCampaign}
            disabled={resources[ResourceType.ECONOMIC] < 200}
            className="w-full bg-blue-600 text-white p-2 rounded text-sm hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Influenciar Legislação (200 🪙)
          </button>
        )}
        
        {playerRole === PlayerRole.FAMILY_FARMER && (
          <button
            onClick={organizeSocialMovement}
            disabled={resources[ResourceType.ECONOMIC] < 100}
            className="w-full bg-green-600 text-white p-2 rounded text-sm hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Organizar Feira de Agricultores (100 🪙)
          </button>
        )}
        
        {playerRole === PlayerRole.POLITICIAN && (
          <button
            onClick={conductPoliticalCampaign}
            disabled={resources[ResourceType.ECONOMIC] < 200}
            className="w-full bg-purple-600 text-white p-2 rounded text-sm hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Realizar Campanha Política (200 🪙)
          </button>
        )}
        
        {playerRole === PlayerRole.ACTIVIST && (
          <button
            onClick={organizeSocialMovement}
            disabled={resources[ResourceType.ECONOMIC] < 100}
            className="w-full bg-amber-600 text-white p-2 rounded text-sm hover:bg-amber-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Organizar Movimento Social (100 🪙)
          </button>
        )}
      </div>
      
      {/* Eventos */}
      <div className="mb-4">
        <button
          onClick={onShowEvents}
          disabled={activeEvents.length === 0}
          className={`w-full p-2 rounded text-sm transition ${
            activeEvents.length > 0 
              ? "bg-amber-100 text-amber-800 hover:bg-amber-200" 
              : "bg-gray-100 text-gray-500 cursor-not-allowed"
          }`}
        >
          {activeEvents.length > 0 
            ? `Ver Eventos Ativos (${activeEvents.length})`
            : "Sem Eventos Ativos"
          }
        </button>
      </div>
      
      {/* Passagem de tempo */}
      <div>
        <button
          onClick={onAdvanceYear}
          className="w-full bg-indigo-600 text-white p-3 rounded font-medium hover:bg-indigo-700 transition"
        >
          Avançar 3 Anos
        </button>
        
        <p className="text-xs text-center text-gray-500 mt-2">
          {activeEvents.length > 0
            ? "Resolva os eventos ativos antes de avançar."
            : "Avançar terminará seu turno atual."
          }
        </p>
      </div>
    </div>
  );
}