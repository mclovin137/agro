import { useState } from "react";
import { useGame } from "../game/store";
import MarketPanel from "./MarketPanel";
import GlobalMarketPanel from "./GlobalMarketPanel";
import { formatCurrency, crops } from "../game/crops";
import { getLandlordThreatLevel } from "../game/events";
import { getWeatherIcon } from "../game/utils";
import { VICTORY_LAND_PLOTS, VICTORY_INFLUENCE, VICTORY_REPUTATION, VICTORY_MONEY } from "../game/constants";
import { VictoryType } from "../game/types";

export default function Sidebar() {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState("market");
  
  // Calculate owned plots
  const ownedPlots = state.plots.filter(plot => plot.owned).length;
  const totalAvailablePlots = state.plots.filter(plot => plot.type !== 'locked').length;
  
  // Get farming stats
  const activeCrops = state.plots.filter(plot => plot.crop).length;
  const readyToHarvest = state.plots.filter(plot => plot.crop?.readyToHarvest).length;
  
  // Get landlord resistance level
  const threatLevel = getLandlordThreatLevel(state.influence, state.reputation);
  
  return (
    <div>
      
      <div className="border-b border-gray-200 bg-white">
        <div className="flex">
          <button
            className={`flex-1 p-2 text-sm font-medium ${
              activeTab === "market" 
                ? "bg-green-100 text-green-800 border-b-2 border-green-500" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("market")}
          >
            Mercado
          </button>
          <button
            className={`flex-1 p-2 text-sm font-medium ${
              activeTab === "global" 
                ? "bg-green-100 text-green-800 border-b-2 border-green-500" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("global")}
          >
            Global
          </button>
          <button
            className={`flex-1 p-2 text-sm font-medium ${
              activeTab === "stats" 
                ? "bg-green-100 text-green-800 border-b-2 border-green-500" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("stats")}
          >
            Estat.
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {activeTab === "market" && <MarketPanel />}
        
        {activeTab === "global" && <GlobalMarketPanel />}
        
        {activeTab === "stats" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Sua Fazenda</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lotes possuídos:</span>
                  <span className="font-medium">{ownedPlots} de {totalAvailablePlots}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Plantações ativas:</span>
                  <span className="font-medium">{activeCrops}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Prontas para colheita:</span>
                  <span className="font-medium text-yellow-600">{readyToHarvest}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Clima</h3>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Estação:</span>
                  <span className="font-medium">{state.season}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tempo:</span>
                  <span className="font-medium flex items-center">
                    {getWeatherIcon(state.weather)} {state.weather}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Resistência dos Latifundiários</h3>
              <div className={`rounded-lg p-3 ${
                threatLevel >= 4 ? 'bg-red-50' : 
                threatLevel >= 2 ? 'bg-yellow-50' : 'bg-green-50'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nível de ameaça:</span>
                  <span className={`font-medium ${
                    threatLevel >= 4 ? 'text-red-600' : 
                    threatLevel >= 2 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {threatLevel === 5 ? 'Muito Alto' :
                     threatLevel === 4 ? 'Alto' :
                     threatLevel === 3 ? 'Médio' :
                     threatLevel === 2 ? 'Baixo' : 'Muito Baixo'}
                  </span>
                </div>
                <p className="text-xs mt-2 text-gray-600">
                  {threatLevel >= 4 
                    ? 'Os latifundiários estão organizando forte resistência contra sua expansão.'
                    : threatLevel >= 2
                    ? 'Há sinais de hostilidade dos latifundiários contra pequenos agricultores.'
                    : 'A situação está relativamente tranquila, mas fique atento.'
                  }
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Última Colheita</h3>
              <div className="bg-gray-50 rounded-lg p-3">
                {Object.keys(state.lastHarvestedCrops).length === 0 ? (
                  <p className="text-sm text-gray-500">Nenhuma colheita registrada</p>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(state.lastHarvestedCrops).map(([cropId, amount]) => {
                      const crop = crops.find((c: {id: string}) => c.id === cropId);
                      if (!crop) return null;
                      return (
                        <div key={cropId} className="flex justify-between items-center">
                          <span className="text-sm">{crop.name}:</span>
                          <span className="font-medium">{amount} sacas</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            
            {/* Seção de Objetivos e Progressão */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Objetivos de Vitória
              </h3>
              <div className="bg-green-50 rounded-lg p-3">
                {state.gameCompleted ? (
                  <div className="text-center">
                    <div className="text-green-600 font-bold mb-2">Parabéns!</div>
                    <div className="text-sm">
                      {state.victory && (
                        <div>
                          {state.victory.type === VictoryType.LAND && "Você conseguiu realizar a reforma agrária!"}
                          {state.victory.type === VictoryType.INFLUENCE && "Você se tornou um líder da comunidade!"}
                          {state.victory.type === VictoryType.REPUTATION && "Você conquistou uma revolução agrária!"}
                          {state.victory.type === VictoryType.MONEY && "Sua cooperativa alcançou o poder econômico!"}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Progresso de Terra */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Lotes de terra: {ownedPlots}/{VICTORY_LAND_PLOTS}</span>
                        <span>{Math.round(ownedPlots/VICTORY_LAND_PLOTS*100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-600 h-1.5 rounded-full" 
                          style={{ width: `${Math.min(100, Math.round(ownedPlots/VICTORY_LAND_PLOTS*100))}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Progresso de Influência */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Influência: {state.influence}/{VICTORY_INFLUENCE}</span>
                        <span>{Math.round(state.influence/VICTORY_INFLUENCE*100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${Math.min(100, Math.round(state.influence/VICTORY_INFLUENCE*100))}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Progresso de Reputação */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Reputação: {state.reputation}/{VICTORY_REPUTATION}</span>
                        <span>{Math.round(state.reputation/VICTORY_REPUTATION*100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-purple-600 h-1.5 rounded-full" 
                          style={{ width: `${Math.min(100, Math.round(state.reputation/VICTORY_REPUTATION*100))}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Progresso de Dinheiro */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Capital: {formatCurrency(state.money)}</span>
                        <span>{Math.round(state.money/VICTORY_MONEY*100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-yellow-600 h-1.5 rounded-full" 
                          style={{ width: `${Math.min(100, Math.round(state.money/VICTORY_MONEY*100))}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
