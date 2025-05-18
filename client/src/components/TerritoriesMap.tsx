import { useState, useEffect } from "react";
import { Territory, PlayerRole, TerritoryType, ProductionType } from "../game/gameTypes";
import BackgroundPattern from "./BackgroundPattern";

interface TerritoriesMapProps {
  territories: Territory[];
  playerRole: PlayerRole;
  dispatch: React.Dispatch<any>;
}

export default function TerritoriesMap({
  territories,
  playerRole,
  dispatch
}: TerritoriesMapProps) {
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [showTerritoryModal, setShowTerritoryModal] = useState(false);
  const [highlightedTerritory, setHighlightedTerritory] = useState<string | null>(null);
  const [showModalContent, setShowModalContent] = useState(false);
  
  // Controlar a animação de entrada do modal de território
  useEffect(() => {
    if (showTerritoryModal) {
      const timer = setTimeout(() => {
        setShowModalContent(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowModalContent(false);
    }
  }, [showTerritoryModal]);

  // Selecionar um território para ver detalhes
  const handleTerritoryClick = (territory: Territory) => {
    setSelectedTerritory(territory);
    setShowTerritoryModal(true);
  };

  // Fechar o modal de território
  const closeModal = () => {
    setShowTerritoryModal(false);
    setSelectedTerritory(null);
  };

  // Adquirir território
  const acquireTerritory = () => {
    if (!selectedTerritory) return;
    
    dispatch({
      type: "ACQUIRE_TERRITORY",
      payload: { territoryId: selectedTerritory.id }
    });
    
    closeModal();
  };

  // Definir produção para um território
  const setProduction = (productionType: ProductionType) => {
    if (!selectedTerritory) return;
    
    dispatch({
      type: "SET_PRODUCTION",
      payload: { territoryId: selectedTerritory.id, productionType }
    });
    
    closeModal();
  };

  // Melhorar produção de um território
  const improveProduction = () => {
    if (!selectedTerritory) return;
    
    dispatch({
      type: "IMPROVE_PRODUCTION",
      payload: { territoryId: selectedTerritory.id }
    });
    
    closeModal();
  };

  // Implementar práticas sustentáveis em um território
  const implementSustainablePractices = () => {
    if (!selectedTerritory) return;
    
    dispatch({
      type: "IMPLEMENT_SUSTAINABLE_PRACTICES",
      payload: { territoryId: selectedTerritory.id }
    });
    
    closeModal();
  };

  // Obter cor de fundo para cada tipo de território
  const getTerritoryColor = (territory: Territory): string => {
    if (territory.owner === playerRole) {
      // Territórios do jogador em tons de verde
      return territory.type === TerritoryType.AGRIBUSINESS
        ? "bg-green-600" // Agronegócio
        : "bg-emerald-400"; // Agricultura familiar
    }
    
    // Outros tipos de território
    switch (territory.type) {
      case TerritoryType.AGRIBUSINESS:
        return "bg-red-500"; // Agronegócio de outros
      case TerritoryType.FAMILY_FARM:
        return "bg-teal-400"; // Agricultura familiar de outros
      case TerritoryType.PROTECTED:
        return "bg-blue-500"; // Área protegida
      case TerritoryType.INDIGENOUS:
        return "bg-amber-500"; // Território indígena
      case TerritoryType.URBAN:
        return "bg-gray-500"; // Área urbana
      case TerritoryType.UNOCCUPIED:
        return "bg-gray-300"; // Desocupado
      default:
        return "bg-gray-300";
    }
  };

  // Obter nome do tipo de território
  const getTerritoryTypeName = (type: TerritoryType): string => {
    switch (type) {
      case TerritoryType.AGRIBUSINESS:
        return "Agronegócio";
      case TerritoryType.FAMILY_FARM:
        return "Agricultura Familiar";
      case TerritoryType.PROTECTED:
        return "Área de Preservação";
      case TerritoryType.INDIGENOUS:
        return "Território Indígena";
      case TerritoryType.URBAN:
        return "Área Urbana";
      case TerritoryType.UNOCCUPIED:
        return "Terra Desocupada";
      default:
        return "Desconhecido";
    }
  };

  // Obter nome do tipo de produção
  const getProductionTypeName = (type: ProductionType | null): string => {
    if (!type) return "Não produzindo";
    
    switch (type) {
      case ProductionType.SOY:
        return "Soja";
      case ProductionType.CORN:
        return "Milho";
      case ProductionType.CATTLE:
        return "Pecuária";
      case ProductionType.COFFEE:
        return "Café";
      case ProductionType.FRUIT:
        return "Frutas";
      case ProductionType.VEGETABLE:
        return "Hortaliças";
      case ProductionType.ORGANIC:
        return "Cultivo Orgânico";
      default:
        return "Desconhecido";
    }
  };

  // Verificar se o território pode ser adquirido pelo jogador
  const canAcquireTerritory = (territory: Territory): boolean => {
    // Território já é do jogador ou é protegido/indígena
    if (
      territory.owner === playerRole ||
      territory.type === TerritoryType.PROTECTED ||
      territory.type === TerritoryType.INDIGENOUS ||
      territory.type === TerritoryType.URBAN
    ) {
      return false;
    }
    
    // Verificar se o território é adjacente a um território do jogador
    const playerTerritories = territories.filter(t => t.owner === playerRole);
    
    // Se for o primeiro território, qualquer um pode ser adquirido
    if (playerTerritories.length === 0) {
      return true;
    }
    
    // Caso contrário, deve ser adjacente a um território existente
    return playerTerritories.some(t => territory.neighbors.includes(t.id));
  };

  // Organizar territórios em uma grade 5x5
  const gridSize = 5;
  const gridCells = [];

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const territory = territories.find(t => t.position.x === x && t.position.y === y);
      
      if (!territory) {
        gridCells.push(
          <div 
            key={`empty-${x}-${y}`}
            className="bg-gray-200 border border-gray-300 aspect-square flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        );
        continue;
      }
      
      const isHighlighted = territory.id === highlightedTerritory;
      const isAcquirable = canAcquireTerritory(territory);
      
      gridCells.push(
        <div 
          key={territory.id}
          className={`${getTerritoryColor(territory)} border-2 ${
            territory.owner === playerRole 
              ? "border-white" 
              : isAcquirable 
                ? "border-yellow-300" 
                : "border-gray-700"
          } aspect-square relative cursor-pointer transition-all duration-300 ${
            isHighlighted ? "shadow-lg z-10 scale-105" : ""
          } hover:shadow-md`}
          onClick={() => handleTerritoryClick(territory)}
          onMouseEnter={() => setHighlightedTerritory(territory.id)}
          onMouseLeave={() => setHighlightedTerritory(null)}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-1">
            <span className="text-xs font-bold text-center drop-shadow-md">{territory.name}</span>
            
            {/* Ícone para territórios adquiríveis */}
            {isAcquirable && (
              <span className="absolute top-1 right-1 text-yellow-300 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            )}
            
            {/* Indicador de propriedade do jogador */}
            {territory.owner === playerRole && (
              <span className="absolute top-1 left-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
            
            {/* Informação de produção */}
            {territory.production && (
              <div className="flex items-center gap-1 text-xxs mt-1 bg-black bg-opacity-40 px-1.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>{getProductionTypeName(territory.production)}</span>
              </div>
            )}
            
            {/* Barra de saúde ambiental */}
            <div className="absolute bottom-1 left-1 right-1 h-1 bg-black bg-opacity-30 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  territory.environmentalHealth > 70 ? "bg-green-400" :
                  territory.environmentalHealth > 40 ? "bg-yellow-400" :
                  "bg-red-400"
                }`}
                style={{ width: `${territory.environmentalHealth}%` }}
              ></div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Mapa de Territórios</h2>
        
        <div className="text-sm text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Clique em um território para gerenciá-lo</span>
        </div>
      </div>
      
      {/* Legenda do mapa */}
      <div className="mb-4 bg-white rounded-lg shadow-sm border border-gray-100 p-3">
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h4 className="text-sm font-semibold text-gray-700">Legenda do mapa</h4>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 rounded p-1.5 border border-gray-100 flex items-center">
            <div className="h-4 w-4 bg-green-600 border-2 border-white shadow-sm rounded-sm mr-2"></div>
            <span className="text-xs">Agronegócio (seu)</span>
          </div>
          <div className="bg-gray-50 rounded p-1.5 border border-gray-100 flex items-center">
            <div className="h-4 w-4 bg-emerald-400 border-2 border-white shadow-sm rounded-sm mr-2"></div>
            <span className="text-xs">Agricultura Familiar (sua)</span>
          </div>
          <div className="bg-gray-50 rounded p-1.5 border border-gray-100 flex items-center">
            <div className="h-4 w-4 bg-red-500 border-2 border-gray-700 shadow-sm rounded-sm mr-2"></div>
            <span className="text-xs">Agronegócio (outros)</span>
          </div>
          <div className="bg-gray-50 rounded p-1.5 border border-gray-100 flex items-center">
            <div className="h-4 w-4 bg-teal-400 border-2 border-gray-700 shadow-sm rounded-sm mr-2"></div>
            <span className="text-xs">Agricultura Familiar (outros)</span>
          </div>
          <div className="bg-gray-50 rounded p-1.5 border border-gray-100 flex items-center">
            <div className="h-4 w-4 bg-blue-500 border-2 border-gray-700 shadow-sm rounded-sm mr-2"></div>
            <span className="text-xs">Área Protegida</span>
          </div>
          <div className="bg-gray-50 rounded p-1.5 border border-gray-100 flex items-center">
            <div className="h-4 w-4 bg-amber-500 border-2 border-gray-700 shadow-sm rounded-sm mr-2"></div>
            <span className="text-xs">Território Indígena</span>
          </div>
          <div className="bg-gray-50 rounded p-1.5 border border-gray-100 flex items-center">
            <div className="h-4 w-4 bg-gray-300 border-2 border-gray-700 shadow-sm rounded-sm mr-2"></div>
            <span className="text-xs">Desocupado</span>
          </div>
          <div className="bg-gray-50 rounded p-1.5 border border-gray-100 flex items-center">
            <div className="h-4 w-4 border-2 border-yellow-300 bg-gray-100 shadow-sm rounded-sm mr-2"></div>
            <span className="text-xs">Disponível para aquisição</span>
          </div>
        </div>
      </div>
      
      {/* Grade de territórios */}
      <div 
        className="grid gap-1 border-2 border-gray-800 p-1 bg-gray-800"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`
        }}
      >
        {gridCells}
      </div>
      
      {/* Modal de detalhes do território */}
      {showTerritoryModal && selectedTerritory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <BackgroundPattern className="text-white/5" />
          
          <div 
            className={`bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 transition-all duration-500 ${
              showModalContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className={`${getTerritoryColor(selectedTerritory)} p-5 text-white relative`}>
              {/* Padrão de fundo decorativo */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="territoryGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#territoryGrid)" />
                </svg>
              </div>
              
              {/* Botão de fechar */}
              <button 
                onClick={closeModal}
                className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
                aria-label="Fechar modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold tracking-tight">{selectedTerritory.name}</h3>
                <div className="flex items-center mt-1 text-sm">
                  <span className="inline-block h-3 w-3 rounded-full bg-white/30 mr-2"></span>
                  <span>
                    {getTerritoryTypeName(selectedTerritory.type)}
                    {selectedTerritory.owner === playerRole && " (Seu território)"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-5 animate-fadeIn">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Produção</h4>
                  </div>
                  <p className="font-medium text-gray-800">
                    {getProductionTypeName(selectedTerritory.production)}
                  </p>
                </div>
                
                {selectedTerritory.production && (
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Eficiência</h4>
                    </div>
                    <div className="mt-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-1000" 
                        style={{ width: `${selectedTerritory.productionLevel}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1 font-medium text-gray-500">{selectedTerritory.productionLevel}%</p>
                  </div>
                )}
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ambiente</h4>
                  </div>
                  <div className="mt-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        selectedTerritory.environmentalHealth > 70 ? "bg-green-500" :
                        selectedTerritory.environmentalHealth > 40 ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}
                      style={{ width: `${selectedTerritory.environmentalHealth}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right mt-1 font-medium text-gray-500">{selectedTerritory.environmentalHealth}%</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Vizinhanças</h4>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800">
                      {selectedTerritory.neighbors.length} 
                    </span>
                    <span className="text-gray-600 ml-1.5 text-sm">
                      {selectedTerritory.neighbors.length === 1 ? "território conectado" : "territórios conectados"}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Título da seção de ações */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Ações Disponíveis
                </h4>
                <p className="text-sm text-gray-500 mt-1">Selecione uma ação para modificar este território.</p>
              </div>
              
              {/* Ações para o território */}
              <div className="space-y-3 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                {/* Adquirir território */}
                {canAcquireTerritory(selectedTerritory) && (
                  <button
                    onClick={acquireTerritory}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium">Adquirir Território</span>
                  </button>
                )}
                
                {/* Definir produção (apenas para territórios do jogador sem produção) */}
                {selectedTerritory.owner === playerRole && !selectedTerritory.production && (
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                      <h4 className="font-medium text-gray-700">Escolha um tipo de produção:</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setProduction(ProductionType.SOY)}
                        className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-white py-2 px-3 rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all flex flex-col items-center shadow-sm hover:shadow"
                      >
                        <span className="text-2xl mb-1">🌱</span>
                        <span className="font-medium">Soja</span>
                      </button>
                      
                      <button
                        onClick={() => setProduction(ProductionType.CORN)}
                        className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-white py-2 px-3 rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all flex flex-col items-center shadow-sm hover:shadow"
                      >
                        <span className="text-2xl mb-1">🌽</span>
                        <span className="font-medium">Milho</span>
                      </button>
                      
                      <button
                        onClick={() => setProduction(ProductionType.CATTLE)}
                        className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-white py-2 px-3 rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all flex flex-col items-center shadow-sm hover:shadow"
                      >
                        <span className="text-2xl mb-1">🐄</span>
                        <span className="font-medium">Pecuária</span>
                      </button>
                      
                      <button
                        onClick={() => setProduction(ProductionType.COFFEE)}
                        className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-white py-2 px-3 rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all flex flex-col items-center shadow-sm hover:shadow"
                      >
                        <span className="text-2xl mb-1">☕</span>
                        <span className="font-medium">Café</span>
                      </button>
                      
                      <button
                        onClick={() => setProduction(ProductionType.FRUIT)}
                        className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-white py-2 px-3 rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all flex flex-col items-center shadow-sm hover:shadow"
                      >
                        <span className="text-2xl mb-1">🍎</span>
                        <span className="font-medium">Frutas</span>
                      </button>
                      
                      <button
                        onClick={() => setProduction(ProductionType.VEGETABLE)}
                        className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-white py-2 px-3 rounded-lg hover:from-yellow-600 hover:to-yellow-500 transition-all flex flex-col items-center shadow-sm hover:shadow"
                      >
                        <span className="text-2xl mb-1">🥗</span>
                        <span className="font-medium">Hortaliças</span>
                      </button>
                      
                      <button
                        onClick={() => setProduction(ProductionType.ORGANIC)}
                        className="bg-gradient-to-br from-green-600 to-green-500 text-white py-2 px-3 rounded-lg hover:from-green-700 hover:to-green-600 transition-all flex flex-col items-center col-span-2 shadow-sm hover:shadow"
                      >
                        <span className="text-2xl mb-1">🌿</span>
                        <span className="font-medium">Cultivo Orgânico</span>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Melhorar produção (apenas para territórios do jogador com produção) */}
                {selectedTerritory.owner === playerRole && selectedTerritory.production && selectedTerritory.productionLevel < 100 && (
                  <button
                    onClick={improveProduction}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="font-medium">Melhorar Produção (+10%)</span>
                  </button>
                )}
                
                {/* Implementar práticas sustentáveis */}
                {selectedTerritory.owner === playerRole && (
                  <button
                    onClick={implementSustainablePractices}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-3 px-4 rounded-lg hover:from-teal-700 hover:to-teal-600 shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Implementar Práticas Sustentáveis</span>
                  </button>
                )}
                
                {/* Botão de fechar (sempre visível) */}
                <button
                  onClick={closeModal}
                  className="mt-3 w-full py-2.5 px-4 text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Fechar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}