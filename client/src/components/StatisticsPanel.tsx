import { HistoricalData, GameEvent, Territory, PlayerRole } from "../game/gameTypes";
import { HISTORICAL_AGRICULTURAL_DATA } from "../game/gameConstants";

interface StatisticsPanelProps {
  historicalData: HistoricalData[];
  completedEvents: GameEvent[];
  territories: Territory[];
  playerRole: PlayerRole;
  startYear: number;
  currentYear: number;
}

export default function StatisticsPanel({
  historicalData,
  completedEvents,
  territories,
  playerRole,
  startYear,
  currentYear
}: StatisticsPanelProps) {
  // Calcular estatísticas
  const totalTerritoriesOwned = territories.filter(t => t.owner === playerRole).length;
  const averageEnvironmentalHealth = territories
    .filter(t => t.owner === playerRole)
    .reduce((sum, territory) => sum + territory.environmentalHealth, 0) / 
    (totalTerritoriesOwned || 1);
  
  // Encontrar eventos históricos relevantes para o período do jogo
  const relevantHistoricalEvents = HISTORICAL_AGRICULTURAL_DATA.filter(
    event => event.year >= startYear && event.year <= currentYear
  );
  
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Dados Históricos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico simplificado de recursos ao longo do tempo */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-3">Evolução de Recursos</h3>
          
          <div className="relative h-48 border-b border-l border-gray-300">
            {/* Eixo Y */}
            <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
              <span>2000</span>
              <span>1500</span>
              <span>1000</span>
              <span>500</span>
              <span>0</span>
            </div>
            
            {/* Linhas de recurso */}
            <div className="absolute inset-0 p-4">
              {historicalData.length > 1 && (
                <>
                  {/* Linha econômica */}
                  <svg className="w-full h-full overflow-visible">
                    <path
                      d={historicalData.map((data, index) => {
                        const x = (index / (historicalData.length - 1)) * 100;
                        const y = 100 - ((data.economicResource / 2000) * 100);
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      stroke="#F59E0B"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  
                  {/* Linha de influência */}
                  <svg className="w-full h-full overflow-visible absolute inset-0 p-4">
                    <path
                      d={historicalData.map((data, index) => {
                        const x = (index / (historicalData.length - 1)) * 100;
                        const y = 100 - ((data.influenceResource / 2000) * 100);
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      stroke="#3B82F6"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  
                  {/* Linha social */}
                  <svg className="w-full h-full overflow-visible absolute inset-0 p-4">
                    <path
                      d={historicalData.map((data, index) => {
                        const x = (index / (historicalData.length - 1)) * 100;
                        const y = 100 - ((data.socialResource / 2000) * 100);
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      stroke="#8B5CF6"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  
                  {/* Linha ambiental */}
                  <svg className="w-full h-full overflow-visible absolute inset-0 p-4">
                    <path
                      d={historicalData.map((data, index) => {
                        const x = (index / (historicalData.length - 1)) * 100;
                        const y = 100 - ((data.environmentalResource / 2000) * 100);
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      stroke="#10B981"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </>
              )}
            </div>
          </div>
          
          {/* Legenda */}
          <div className="flex flex-wrap gap-3 mt-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 mr-1"></div>
              <span>Econômico</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 mr-1"></div>
              <span>Influência</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 mr-1"></div>
              <span>Social</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 mr-1"></div>
              <span>Ambiental</span>
            </div>
          </div>
        </div>
        
        {/* Estatísticas atuais */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-3">Estatísticas</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-gray-500">Total de Territórios</h4>
              <p className="font-medium text-lg">{totalTerritoriesOwned}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500">Saúde Ambiental Média</h4>
              <p className="font-medium text-lg">{averageEnvironmentalHealth.toFixed(1)}%</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500">Eventos Resolvidos</h4>
              <p className="font-medium text-lg">{completedEvents.length}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-500">Anos no Jogo</h4>
              <p className="font-medium text-lg">{currentYear - startYear}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Eventos históricos */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow border border-gray-200">
        <h3 className="font-medium text-gray-700 mb-3">Eventos Históricos</h3>
        
        <div className="overflow-auto max-h-64">
          <div className="relative pl-8 border-l-2 border-gray-300 ml-2">
            {relevantHistoricalEvents.map((event, index) => (
              <div key={index} className="mb-6 relative">
                <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-green-500"></div>
                <div className="text-sm">
                  <p className="text-gray-500 font-medium">{event.year}</p>
                  <h4 className="font-bold mt-1">{event.event}</h4>
                  <p className="text-gray-600 mt-1">{event.impact}</p>
                </div>
              </div>
            ))}
            
            {relevantHistoricalEvents.length === 0 && (
              <p className="text-gray-500 italic">Nenhum evento histórico relevante para este período.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Eventos resolvidos pelo jogador */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow border border-gray-200">
        <h3 className="font-medium text-gray-700 mb-3">Suas Decisões</h3>
        
        <div className="overflow-auto max-h-64">
          {completedEvents.length > 0 ? (
            <ul className="space-y-3">
              {completedEvents.map((event, index) => (
                <li key={`event-${event.id}-${index}`} className="border-b border-gray-200 pb-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{event.title}</h4>
                    <span className="text-sm text-gray-500">{event.year}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Você ainda não tomou decisões importantes.</p>
          )}
        </div>
      </div>
    </div>
  );
}