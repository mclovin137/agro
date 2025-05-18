// Gerenciador de estado (store) para o jogo "Agronegócio e Poder – O Jogo da Hegemonia"
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { nanoid } from 'nanoid';
import { 
  GameState, 
  GameAction, 
  PlayerRole, 
  ResourceType,
  Territory,
  TerritoryType,
  ProductionType,
  HistoricalData,
  GameEvent
} from './gameTypes';
import { 
  INITIAL_RESOURCES, 
  START_YEAR, 
  END_YEAR,
  YEARS_PER_TURN,
  MAX_RESOURCE_VALUE,
  MIN_RESOURCE_VALUE,
  VICTORY_CONDITIONS,
  DEFEAT_CONDITIONS
} from './gameConstants';
import { generateRandomEvents, evaluateEventConsequences } from './gameEvents';

// Função para gerar territórios iniciais
const initializeTerritories = (): Territory[] => {
  const territories: Territory[] = [];
  
  // Grid 5x5 de territórios
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      // Determinar tipo de território baseado na posição
      let type: TerritoryType;
      let owner: PlayerRole | null = null;
      let production: ProductionType | null = null;
      
      // Territórios iniciais de cada tipo
      if (x === 0 && y === 0) {
        type = TerritoryType.AGRIBUSINESS;
        owner = PlayerRole.AGRIBUSINESS;
        production = ProductionType.SOY;
      } else if (x === 4 && y === 4) {
        type = TerritoryType.FAMILY_FARM;
        owner = PlayerRole.FAMILY_FARMER;
        production = ProductionType.VEGETABLE;
      } else if (x === 2 && y === 2) {
        type = TerritoryType.PROTECTED;
        owner = null;
        production = null;
      } else if (x === 4 && y === 0) {
        type = TerritoryType.INDIGENOUS;
        owner = null;
        production = null;
      } else {
        type = TerritoryType.UNOCCUPIED;
        owner = null;
        production = null;
      }
      
      // Criar o território
      territories.push({
        id: nanoid(),
        name: `Território ${x+1}-${y+1}`,
        type,
        owner,
        production,
        productionLevel: production ? 50 : 0,
        environmentalHealth: type === TerritoryType.PROTECTED ? 100 : 
                            type === TerritoryType.INDIGENOUS ? 90 : 
                            type === TerritoryType.FAMILY_FARM ? 70 : 
                            type === TerritoryType.AGRIBUSINESS ? 40 : 60,
        position: { x, y },
        neighbors: [] // Será preenchido depois
      });
    }
  }
  
  // Configurar vizinhos
  for (let i = 0; i < territories.length; i++) {
    const territory = territories[i];
    const neighbors: string[] = [];
    
    // Verificar todos os outros territórios
    for (let j = 0; j < territories.length; j++) {
      if (i === j) continue; // Pular o próprio território
      
      const other = territories[j];
      
      // Checar se são vizinhos (adjacentes na grade)
      const isNeighbor = (
        (Math.abs(territory.position.x - other.position.x) <= 1 &&
         Math.abs(territory.position.y - other.position.y) === 0) ||
        (Math.abs(territory.position.y - other.position.y) <= 1 &&
         Math.abs(territory.position.x - other.position.x) === 0)
      );
      
      if (isNeighbor) {
        neighbors.push(other.id);
      }
    }
    
    // Atualizar vizinhos do território
    territories[i] = {
      ...territory,
      neighbors
    };
  }
  
  return territories;
};

// Estado inicial do jogo
const createInitialState = (playerName: string, playerRole: PlayerRole): GameState => {
  const initialResources = INITIAL_RESOURCES(playerRole);
  
  // Dados históricos iniciais
  const initialHistoricalData: HistoricalData = {
    year: START_YEAR,
    economicResource: initialResources[ResourceType.ECONOMIC],
    influenceResource: initialResources[ResourceType.INFLUENCE],
    socialResource: initialResources[ResourceType.SOCIAL],
    environmentalResource: initialResources[ResourceType.ENVIRONMENTAL],
    territoriesOwned: playerRole === PlayerRole.AGRIBUSINESS || 
                     playerRole === PlayerRole.FAMILY_FARMER ? 1 : 0
  };
  
  // Configurar territórios iniciais
  const territories = initializeTerritories();
  
  // Gerar eventos iniciais
  const initialEvents = generateRandomEvents(START_YEAR, playerRole);
  
  return {
    playerName,
    playerRole,
    resources: initialResources,
    territories,
    events: initialEvents,
    activeEvents: initialEvents.slice(0, 2), // Limitar a 2 eventos ativos inicialmente
    completedEvents: [],
    currentYear: START_YEAR,
    startYear: START_YEAR,
    endYear: END_YEAR,
    historicalData: [initialHistoricalData],
    gameCompleted: false,
    victory: false
  };
};

// Reducer do jogo
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'ADVANCE_YEAR': {
      const newYear = state.currentYear + YEARS_PER_TURN;
      
      // Verificar se o jogo acabou
      if (newYear > state.endYear) {
        return {
          ...state,
          gameCompleted: true,
          // Determinar vitória com base nas condições específicas do papel
          victory: checkVictoryConditions(state)
        };
      }
      
      // Atualizar recursos baseado na produção dos territórios
      const updatedResources = { ...state.resources };
      let economicGain = 0;
      let environmentalImpact = 0;
      
      // Calcular ganhos de produção e impactos ambientais
      state.territories.forEach(territory => {
        if (territory.owner === state.playerRole && territory.production) {
          // Ganhos econômicos baseados no tipo de produção e nível
          const baseGain = 
            territory.production === ProductionType.SOY || 
            territory.production === ProductionType.CORN ? 50 :
            territory.production === ProductionType.CATTLE ? 70 :
            territory.production === ProductionType.COFFEE ? 60 :
            territory.production === ProductionType.FRUIT || 
            territory.production === ProductionType.VEGETABLE ? 40 :
            territory.production === ProductionType.ORGANIC ? 30 : 0;
          
          economicGain += Math.round(baseGain * (territory.productionLevel / 100));
          
          // Impacto ambiental baseado no tipo de produção
          const baseImpact = 
            territory.production === ProductionType.SOY ? -15 :
            territory.production === ProductionType.CORN ? -10 :
            territory.production === ProductionType.CATTLE ? -20 :
            territory.production === ProductionType.COFFEE ? -5 :
            territory.production === ProductionType.FRUIT ? 0 :
            territory.production === ProductionType.VEGETABLE ? 5 :
            territory.production === ProductionType.ORGANIC ? 10 : 0;
          
          environmentalImpact += baseImpact;
        }
      });
      
      // Aplicar ganhos e impactos
      updatedResources[ResourceType.ECONOMIC] += economicGain;
      updatedResources[ResourceType.ENVIRONMENTAL] += environmentalImpact;
      
      // Atualizar territórios (saúde ambiental, níveis de produção)
      const updatedTerritories = state.territories.map(territory => {
        // Atualizar saúde ambiental
        let newHealth = territory.environmentalHealth;
        
        if (territory.owner === state.playerRole && territory.production) {
          // Impacto do tipo de produção na saúde ambiental
          const healthImpact = 
            territory.production === ProductionType.SOY ? -5 :
            territory.production === ProductionType.CORN ? -3 :
            territory.production === ProductionType.CATTLE ? -7 :
            territory.production === ProductionType.COFFEE ? -2 :
            territory.production === ProductionType.FRUIT ? 0 :
            territory.production === ProductionType.VEGETABLE ? 1 :
            territory.production === ProductionType.ORGANIC ? 3 : 0;
          
          newHealth = Math.max(0, Math.min(100, newHealth + healthImpact));
        } else if (territory.type === TerritoryType.PROTECTED || 
                  territory.type === TerritoryType.INDIGENOUS) {
          // Recuperação natural em áreas protegidas
          newHealth = Math.min(100, newHealth + 2);
        }
        
        // Atualizar nível de produção com base na saúde ambiental
        let newProductionLevel = territory.productionLevel;
        if (territory.production) {
          // Saúde ambiental afeta produtividade
          if (newHealth < 30) {
            // Produtividade cai drasticamente em terras degradadas
            newProductionLevel = Math.max(10, newProductionLevel - 10);
          } else if (newHealth > 70) {
            // Produtividade aumenta em terras saudáveis
            newProductionLevel = Math.min(100, newProductionLevel + 5);
          }
        }
        
        return {
          ...territory,
          environmentalHealth: newHealth,
          productionLevel: newProductionLevel
        };
      });
      
      // Gerar novos eventos
      const newEvents = generateRandomEvents(newYear, state.playerRole);
      
      // Determinar eventos ativos
      const activeEvents = newEvents.slice(0, 2); // Limitar a 2 eventos por vez
      
      // Registrar dados históricos
      const territoriesOwned = updatedTerritories.filter(
        t => t.owner === state.playerRole
      ).length;
      
      const newHistoricalData: HistoricalData = {
        year: newYear,
        economicResource: updatedResources[ResourceType.ECONOMIC],
        influenceResource: updatedResources[ResourceType.INFLUENCE],
        socialResource: updatedResources[ResourceType.SOCIAL],
        environmentalResource: updatedResources[ResourceType.ENVIRONMENTAL],
        territoriesOwned
      };
      
      // Aplicar limites aos recursos
      Object.keys(updatedResources).forEach(key => {
        const resourceKey = key as ResourceType;
        updatedResources[resourceKey] = Math.max(
          MIN_RESOURCE_VALUE, 
          Math.min(MAX_RESOURCE_VALUE, updatedResources[resourceKey])
        );
      });
      
      // Verificar condições de derrota
      const defeat = checkDefeatConditions(
        updatedResources, 
        state.playerRole
      );
      
      if (defeat) {
        return {
          ...state,
          resources: updatedResources,
          territories: updatedTerritories,
          currentYear: newYear,
          historicalData: [...state.historicalData, newHistoricalData],
          gameCompleted: true,
          victory: false,
          defeatReason: defeat
        };
      }
      
      return {
        ...state,
        resources: updatedResources,
        territories: updatedTerritories,
        events: [...state.events, ...newEvents],
        activeEvents,
        currentYear: newYear,
        historicalData: [...state.historicalData, newHistoricalData]
      };
    }
    
    case 'RESOLVE_EVENT': {
      const { eventId, optionId } = action.payload;
      
      // Encontrar o evento
      const eventIndex = state.events.findIndex(e => e.id === eventId);
      if (eventIndex === -1) return state;
      
      const event = state.events[eventIndex];
      
      // Encontrar a opção selecionada
      const selectedOption = event.options.find(o => o.id === optionId);
      if (!selectedOption) return state;
      
      // Aplicar consequências ajustadas ao papel do jogador
      const adjustedConsequences = evaluateEventConsequences(
        selectedOption.consequences, 
        state.playerRole
      );
      
      // Atualizar recursos
      const updatedResources = { ...state.resources };
      
      adjustedConsequences.forEach(consequence => {
        updatedResources[consequence.resourceType] += consequence.value;
      });
      
      // Aplicar limites aos recursos
      Object.keys(updatedResources).forEach(key => {
        const resourceKey = key as ResourceType;
        updatedResources[resourceKey] = Math.max(
          MIN_RESOURCE_VALUE, 
          Math.min(MAX_RESOURCE_VALUE, updatedResources[resourceKey])
        );
      });
      
      // Marcar evento como resolvido
      const updatedEvents = [...state.events];
      updatedEvents[eventIndex] = {
        ...event,
        resolved: true
      };
      
      // Remover dos eventos ativos
      const updatedActiveEvents = state.activeEvents.filter(e => e.id !== eventId);
      
      // Adicionar aos eventos completados
      const updatedCompletedEvents = [...state.completedEvents, event];
      
      return {
        ...state,
        resources: updatedResources,
        events: updatedEvents,
        activeEvents: updatedActiveEvents,
        completedEvents: updatedCompletedEvents
      };
    }
    
    case 'ACQUIRE_TERRITORY': {
      const { territoryId } = action.payload;
      
      // Encontrar o território
      const territoryIndex = state.territories.findIndex(t => t.id === territoryId);
      if (territoryIndex === -1) return state;
      
      const territory = state.territories[territoryIndex];
      
      // Verificar se o território pode ser adquirido
      if (
        territory.type === TerritoryType.PROTECTED || 
        territory.type === TerritoryType.INDIGENOUS || 
        territory.owner !== null
      ) {
        return state;
      }
      
      // Verificar se o território é adjacente a um território do jogador
      const playerTerritories = state.territories.filter(t => t.owner === state.playerRole);
      const isAdjacent = playerTerritories.some(t => 
        territory.neighbors.includes(t.id)
      );
      
      if (!isAdjacent && playerTerritories.length > 0) {
        return state;
      }
      
      // Custo baseado no papel do jogador
      const economicCost = state.playerRole === PlayerRole.AGRIBUSINESS ? 200 : 
                           state.playerRole === PlayerRole.FAMILY_FARMER ? 150 :
                           state.playerRole === PlayerRole.POLITICIAN ? 250 :
                           state.playerRole === PlayerRole.ACTIVIST ? 100 : 200;
      
      const influenceCost = state.playerRole === PlayerRole.AGRIBUSINESS ? 50 : 
                           state.playerRole === PlayerRole.FAMILY_FARMER ? 100 :
                           state.playerRole === PlayerRole.POLITICIAN ? 20 :
                           state.playerRole === PlayerRole.ACTIVIST ? 150 : 100;
      
      // Verificar se o jogador tem recursos suficientes
      if (
        state.resources[ResourceType.ECONOMIC] < economicCost || 
        state.resources[ResourceType.INFLUENCE] < influenceCost
      ) {
        return state;
      }
      
      // Atualizar recursos
      const updatedResources = { ...state.resources };
      updatedResources[ResourceType.ECONOMIC] -= economicCost;
      updatedResources[ResourceType.INFLUENCE] -= influenceCost;
      
      // Determinar o tipo de território baseado no papel do jogador
      const newType = state.playerRole === PlayerRole.AGRIBUSINESS ? 
                     TerritoryType.AGRIBUSINESS : 
                     state.playerRole === PlayerRole.FAMILY_FARMER ? 
                     TerritoryType.FAMILY_FARM : 
                     TerritoryType.UNOCCUPIED;
      
      // Atualizar território
      const updatedTerritories = [...state.territories];
      updatedTerritories[territoryIndex] = {
        ...territory,
        type: newType,
        owner: state.playerRole
      };
      
      return {
        ...state,
        resources: updatedResources,
        territories: updatedTerritories
      };
    }
    
    case 'SET_PRODUCTION': {
      const { territoryId, productionType } = action.payload;
      
      // Encontrar o território
      const territoryIndex = state.territories.findIndex(t => t.id === territoryId);
      if (territoryIndex === -1) return state;
      
      const territory = state.territories[territoryIndex];
      
      // Verificar se o jogador é dono do território
      if (territory.owner !== state.playerRole) {
        return state;
      }
      
      // Custo para iniciar produção
      const cost = 
        productionType === ProductionType.SOY ? 100 :
        productionType === ProductionType.CORN ? 80 :
        productionType === ProductionType.CATTLE ? 120 :
        productionType === ProductionType.COFFEE ? 150 :
        productionType === ProductionType.FRUIT ? 90 :
        productionType === ProductionType.VEGETABLE ? 70 :
        productionType === ProductionType.ORGANIC ? 100 : 0;
      
      // Verificar se o jogador tem recursos suficientes
      if (state.resources[ResourceType.ECONOMIC] < cost) {
        return state;
      }
      
      // Atualizar recursos
      const updatedResources = { ...state.resources };
      updatedResources[ResourceType.ECONOMIC] -= cost;
      
      // Atualizar território
      const updatedTerritories = [...state.territories];
      updatedTerritories[territoryIndex] = {
        ...territory,
        production: productionType,
        productionLevel: 50 // Nível inicial de produção
      };
      
      return {
        ...state,
        resources: updatedResources,
        territories: updatedTerritories
      };
    }
    
    case 'IMPROVE_PRODUCTION': {
      const { territoryId } = action.payload;
      
      // Encontrar o território
      const territoryIndex = state.territories.findIndex(t => t.id === territoryId);
      if (territoryIndex === -1) return state;
      
      const territory = state.territories[territoryIndex];
      
      // Verificar se o jogador é dono do território e se há produção
      if (territory.owner !== state.playerRole || !territory.production) {
        return state;
      }
      
      // Verificar se a produção já está no máximo
      if (territory.productionLevel >= 100) {
        return state;
      }
      
      // Custo para melhorar produção
      const cost = 50 + Math.floor(territory.productionLevel / 2);
      
      // Verificar se o jogador tem recursos suficientes
      if (state.resources[ResourceType.ECONOMIC] < cost) {
        return state;
      }
      
      // Atualizar recursos
      const updatedResources = { ...state.resources };
      updatedResources[ResourceType.ECONOMIC] -= cost;
      
      // Atualizar território
      const updatedTerritories = [...state.territories];
      updatedTerritories[territoryIndex] = {
        ...territory,
        productionLevel: Math.min(100, territory.productionLevel + 10)
      };
      
      return {
        ...state,
        resources: updatedResources,
        territories: updatedTerritories
      };
    }
    
    case 'IMPLEMENT_SUSTAINABLE_PRACTICES': {
      const { territoryId } = action.payload;
      
      // Encontrar o território
      const territoryIndex = state.territories.findIndex(t => t.id === territoryId);
      if (territoryIndex === -1) return state;
      
      const territory = state.territories[territoryIndex];
      
      // Verificar se o jogador é dono do território
      if (territory.owner !== state.playerRole) {
        return state;
      }
      
      // Custo para implementar práticas sustentáveis
      const economicCost = 100;
      const environmentalGain = 20;
      
      // Verificar se o jogador tem recursos suficientes
      if (state.resources[ResourceType.ECONOMIC] < economicCost) {
        return state;
      }
      
      // Atualizar recursos
      const updatedResources = { ...state.resources };
      updatedResources[ResourceType.ECONOMIC] -= economicCost;
      updatedResources[ResourceType.ENVIRONMENTAL] += environmentalGain;
      
      // Aplicar limites aos recursos
      updatedResources[ResourceType.ENVIRONMENTAL] = Math.min(
        MAX_RESOURCE_VALUE, 
        updatedResources[ResourceType.ENVIRONMENTAL]
      );
      
      // Atualizar território
      const updatedTerritories = [...state.territories];
      updatedTerritories[territoryIndex] = {
        ...territory,
        environmentalHealth: Math.min(100, territory.environmentalHealth + 15)
      };
      
      return {
        ...state,
        resources: updatedResources,
        territories: updatedTerritories
      };
    }
    
    case 'CONDUCT_POLITICAL_CAMPAIGN': {
      // Custo e ganhos da campanha
      const economicCost = 200;
      const influenceGain = 100;
      const socialGain = 50;
      
      // Verificar se o jogador tem recursos suficientes
      if (state.resources[ResourceType.ECONOMIC] < economicCost) {
        return state;
      }
      
      // Atualizar recursos
      const updatedResources = { ...state.resources };
      updatedResources[ResourceType.ECONOMIC] -= economicCost;
      updatedResources[ResourceType.INFLUENCE] += influenceGain;
      updatedResources[ResourceType.SOCIAL] += socialGain;
      
      // Aplicar limites aos recursos
      updatedResources[ResourceType.INFLUENCE] = Math.min(
        MAX_RESOURCE_VALUE, 
        updatedResources[ResourceType.INFLUENCE]
      );
      updatedResources[ResourceType.SOCIAL] = Math.min(
        MAX_RESOURCE_VALUE, 
        updatedResources[ResourceType.SOCIAL]
      );
      
      return {
        ...state,
        resources: updatedResources
      };
    }
    
    case 'ORGANIZE_SOCIAL_MOVEMENT': {
      // Custo e ganhos do movimento social
      const economicCost = 100;
      const socialGain = 150;
      const influenceGain = 50;
      
      // Verificar se o jogador tem recursos suficientes
      if (state.resources[ResourceType.ECONOMIC] < economicCost) {
        return state;
      }
      
      // Atualizar recursos
      const updatedResources = { ...state.resources };
      updatedResources[ResourceType.ECONOMIC] -= economicCost;
      updatedResources[ResourceType.SOCIAL] += socialGain;
      updatedResources[ResourceType.INFLUENCE] += influenceGain;
      
      // Aplicar limites aos recursos
      updatedResources[ResourceType.SOCIAL] = Math.min(
        MAX_RESOURCE_VALUE, 
        updatedResources[ResourceType.SOCIAL]
      );
      updatedResources[ResourceType.INFLUENCE] = Math.min(
        MAX_RESOURCE_VALUE, 
        updatedResources[ResourceType.INFLUENCE]
      );
      
      return {
        ...state,
        resources: updatedResources
      };
    }
    
    default:
      return state;
  }
};

// Função para verificar condições de vitória
const checkVictoryConditions = (state: GameState): boolean => {
  const conditions = VICTORY_CONDITIONS[state.playerRole];
  const economicThreshold = "economic" in conditions ? conditions.economic : undefined;
  const influenceThreshold = "influence" in conditions ? conditions.influence : undefined;
  const socialThreshold = "social" in conditions ? conditions.social : undefined;
  const environmentalThreshold = "environmental" in conditions ? conditions.environmental : undefined;
  const territoriesThreshold = "territoriesControlled" in conditions ? conditions.territoriesControlled : undefined;
  
  // Verificar condições específicas para o papel do jogador
  if (state.playerRole === PlayerRole.AGRIBUSINESS) {
    // Agronegócio vence com econômico alto e muitos territórios
    const economicCondition = economicThreshold !== undefined && 
      state.resources[ResourceType.ECONOMIC] >= economicThreshold;
    
    const territoriesCondition = territoriesThreshold !== undefined &&
      state.territories.filter(t => t.owner === state.playerRole).length >= territoriesThreshold;
    
    return economicCondition && territoriesCondition;
  } 
  else if (state.playerRole === PlayerRole.FAMILY_FARMER) {
    // Agricultor familiar vence com econômico moderado, ambiental alto e territórios suficientes
    const economicCondition = economicThreshold !== undefined && 
      state.resources[ResourceType.ECONOMIC] >= economicThreshold;
    
    const environmentalCondition = environmentalThreshold !== undefined && 
      state.resources[ResourceType.ENVIRONMENTAL] >= environmentalThreshold;
    
    const territoriesCondition = territoriesThreshold !== undefined &&
      state.territories.filter(t => t.owner === state.playerRole).length >= territoriesThreshold;
    
    return economicCondition && environmentalCondition && territoriesCondition;
  }
  else if (state.playerRole === PlayerRole.POLITICIAN) {
    // Político vence com influência e apoio social altos
    const influenceCondition = influenceThreshold !== undefined && 
      state.resources[ResourceType.INFLUENCE] >= influenceThreshold;
    
    const socialCondition = socialThreshold !== undefined && 
      state.resources[ResourceType.SOCIAL] >= socialThreshold;
    
    return influenceCondition && socialCondition;
  }
  else if (state.playerRole === PlayerRole.ACTIVIST) {
    // Ativista vence com apoio social e ambiental altos, além de reforma agrária
    const socialCondition = socialThreshold !== undefined && 
      state.resources[ResourceType.SOCIAL] >= socialThreshold;
    
    const environmentalCondition = environmentalThreshold !== undefined && 
      state.resources[ResourceType.ENVIRONMENTAL] >= environmentalThreshold;
    
    // Considerar reforma agrária atingida se houver mais territórios de agricultura familiar do que agronegócio
    const familyFarmTerritories = state.territories.filter(
      t => t.type === TerritoryType.FAMILY_FARM
    ).length;
    
    const agribusinessTerritories = state.territories.filter(
      t => t.type === TerritoryType.AGRIBUSINESS
    ).length;
    
    const landReformAchieved = familyFarmTerritories > agribusinessTerritories;
    
    return socialCondition && environmentalCondition && landReformAchieved;
  }
  
  return false;
};

// Função para verificar condições de derrota
const checkDefeatConditions = (
  resources: Record<ResourceType, number>, 
  playerRole: PlayerRole
): string | null => {
  const conditions = DEFEAT_CONDITIONS[playerRole];
  const economicThreshold = "economic" in conditions ? conditions.economic : undefined;
  const influenceThreshold = "influence" in conditions ? conditions.influence : undefined;
  const socialThreshold = "social" in conditions ? conditions.social : undefined;
  
  // Verificar recursos críticos para cada papel
  if (playerRole === PlayerRole.AGRIBUSINESS) {
    if (economicThreshold !== undefined && resources[ResourceType.ECONOMIC] <= economicThreshold) {
      return "Falência econômica: seu agronegócio entrou em colapso financeiro.";
    }
    
    if (influenceThreshold !== undefined && resources[ResourceType.INFLUENCE] <= influenceThreshold) {
      return "Perda de influência: seu agronegócio perdeu apoio político necessário para operar.";
    }
  } 
  else if (playerRole === PlayerRole.FAMILY_FARMER) {
    if (economicThreshold !== undefined && resources[ResourceType.ECONOMIC] <= economicThreshold) {
      return "Falência econômica: sua agricultura familiar tornou-se inviável financeiramente.";
    }
    
    if (socialThreshold !== undefined && resources[ResourceType.SOCIAL] <= socialThreshold) {
      return "Perda de apoio comunitário: sua agricultura familiar perdeu sua base social.";
    }
  }
  else if (playerRole === PlayerRole.POLITICIAN) {
    if (influenceThreshold !== undefined && resources[ResourceType.INFLUENCE] <= influenceThreshold) {
      return "Perda de capital político: você perdeu sua capacidade de influenciar decisões.";
    }
    
    if (socialThreshold !== undefined && resources[ResourceType.SOCIAL] <= socialThreshold) {
      return "Rejeição popular: você perdeu completamente o apoio do eleitorado.";
    }
  }
  else if (playerRole === PlayerRole.ACTIVIST) {
    if (socialThreshold !== undefined && resources[ResourceType.SOCIAL] <= socialThreshold) {
      return "Movimento esvaziado: seu movimento social perdeu apoio popular.";
    }
    
    if (influenceThreshold !== undefined && resources[ResourceType.INFLUENCE] <= influenceThreshold) {
      return "Marginalização política: seu movimento perdeu qualquer capacidade de negociação.";
    }
  }
  
  return null;
};

// Contexto do jogo
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Props para o provedor do jogo
interface GameProviderProps {
  children: ReactNode;
  initialPlayerName: string;
  initialPlayerRole: PlayerRole;
}

// Provedor do contexto do jogo
export function GameProvider({ 
  children, 
  initialPlayerName, 
  initialPlayerRole 
}: GameProviderProps) {
  // Criar estado inicial
  const initialState = createInitialState(initialPlayerName, initialPlayerRole);
  
  // Tentar carregar jogo salvo
  const loadedGame = localStorage.getItem('agronegocio_poder_game');
  
  let startingState;
  
  if (loadedGame) {
    try {
      const parsedState = JSON.parse(loadedGame);
      startingState = parsedState;
    } catch (error) {
      console.error("Erro ao carregar jogo salvo:", error);
      startingState = initialState;
    }
  } else {
    startingState = initialState;
  }
  
  // Configurar o reducer
  const [state, dispatch] = useReducer(gameReducer, startingState);
  
  // Salvar jogo no localStorage
  useEffect(() => {
    localStorage.setItem('agronegocio_poder_game', JSON.stringify(state));
  }, [state]);
  
  const contextValue = { state, dispatch };
  
  return React.createElement(
    GameContext.Provider,
    { value: contextValue },
    children
  );
}

// Hook para usar o contexto do jogo
export function useGameState() {
  const context = useContext(GameContext);
  
  if (context === undefined) {
    throw new Error('useGameState deve ser usado dentro de um GameProvider');
  }
  
  return context;
}