import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  INITIAL_MONEY, 
  INITIAL_INFLUENCE, 
  INITIAL_REPUTATION, 
  INITIAL_PLOTS,
  MAX_LAND_PLOTS,
  Season,
  Weather,
  LandType,
  WEEKS_PER_SEASON,
  LAND_ACQUISITION_THRESHOLDS,
  EventType,
  VICTORY_LAND_PLOTS,
  VICTORY_INFLUENCE,
  VICTORY_REPUTATION,
  VICTORY_MONEY
} from './constants';
import { GameState, GameAction, Plot, PlantedCrop, GameEvent, Crop, ExportContract, VictoryType, VictoryState, GameRole } from './types';
import { crops } from './crops';
import { generateRandomEvents, generateAssemblyEvent } from './events';
import { getCurrentSeason, calculateCropGrowth, generateWeatherCondition } from './utils';
import { initializeGlobalMarket, updateGlobalMarket, MarketRegion, calculateCropPriceInRegion } from './economy';
import { nanoid } from 'nanoid';

// Função para verificar condições de vitória
function checkVictoryConditions(state: GameState): VictoryState | null {
  // Verificar vitória por conquista de terras
  const ownedPlotsCount = state.plots.filter(p => p.owned).length;
  if (ownedPlotsCount >= VICTORY_LAND_PLOTS) {
    return {
      achieved: true,
      type: VictoryType.LAND,
      week: state.week,
      year: state.year
    };
  }
  
  // Verificar vitória por influência
  if (state.influence >= VICTORY_INFLUENCE) {
    return {
      achieved: true,
      type: VictoryType.INFLUENCE,
      week: state.week,
      year: state.year
    };
  }
  
  // Verificar vitória por reputação
  if (state.reputation >= VICTORY_REPUTATION) {
    return {
      achieved: true,
      type: VictoryType.REPUTATION,
      week: state.week,
      year: state.year
    };
  }
  
  // Verificar vitória por dinheiro
  if (state.money >= VICTORY_MONEY) {
    return {
      achieved: true,
      type: VictoryType.MONEY,
      week: state.week,
      year: state.year
    };
  }
  
  return null;
}

// Função para criar um evento de vitória
function createVictoryEvent(victoryState: VictoryState): GameEvent {
  let title = "";
  let description = "";
  
  switch (victoryState.type) {
    case VictoryType.LAND:
      title = "Vitória: Reforma Agrária Alcançada!";
      description = "Sua cooperativa conquistou terras suficientes para garantir a subsistência de dezenas de famílias! Você conseguiu implementar um modelo sustentável de reforma agrária na região.";
      break;
    case VictoryType.INFLUENCE:
      title = "Vitória: Poder Popular!";
      description = "A influência de seu movimento chegou a níveis sem precedentes! Você se tornou um líder nacional na luta por direitos dos pequenos agricultores.";
      break;
    case VictoryType.REPUTATION:
      title = "Vitória: Revolução do Campo!";
      description = "Sua reputação é lendária! Comunidades de todo o país estão seguindo seu exemplo de organização coletiva e resistência contra o latifúndio.";
      break;
    case VictoryType.MONEY:
      title = "Vitória: Prosperidade Cooperativa!";
      description = "Sua cooperativa se tornou um modelo de sucesso econômico e sustentável! Os lucros são distribuídos entre os cooperados, beneficiando toda a comunidade.";
      break;
  }
  
  return {
    id: nanoid(),
    type: EventType.VICTORY,
    title,
    description,
    week: victoryState.week,
    impact: {
      money: 0,
      influence: 0,
      reputation: 0
    },
    options: [
      {
        id: nanoid(),
        text: "Parabéns! Você venceu o jogo!",
        outcomes: {
          money: 0,
          influence: 0,
          reputation: 0
        }
      }
    ],
    resolved: false
  };
}

// Initialize game map with proper land distribution
function initializePlots(): Plot[] {
  const plots: Plot[] = [];
  const gridSize = 6; // 6x6 grid for a total of 36 plots
  
  // Helper to determine if a plot should be initially owned
  const isInitialPlot = (x: number, y: number) => {
    // Player starts with plots at coordinates (2,2) and (3,2)
    return (x === 2 && y === 2) || (x === 3 && y === 2);
  };
  
  // Determine plot type based on position
  const getPlotType = (x: number, y: number): LandType => {
    if (isInitialPlot(x, y)) {
      return LandType.PLAYER;
    }
    
    // Border plots are locked (mountains, river, etc.)
    if (x === 0 || y === 0 || x === gridSize - 1 || y === gridSize - 1) {
      return LandType.LOCKED;
    }
    
    // Some plots belong to the landlord
    if ((x < 2 && y < 3) || (x > 3 && y < 3) || (x < 2 && y > 3) || (x > 3 && y > 3)) {
      return LandType.LANDLORD;
    }
    
    // Remaining plots can be acquired
    return LandType.LANDLORD;
  };
  
  // Create the grid of plots
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const type = getPlotType(x, y);
      plots.push({
        id: `plot-${x}-${y}`,
        x,
        y,
        type,
        owned: type === LandType.PLAYER,
        crop: null
      });
    }
  }
  
  return plots;
}

// Função para ajustar recursos iniciais com base no papel escolhido
function getInitialResourcesByRole(role: GameRole) {
  switch (role) {
    case GameRole.AGRIBUSINESS:
      return {
        money: INITIAL_MONEY * 2, // Agronegócio começa com mais capital
        influence: INITIAL_INFLUENCE + 100, // Maior influência política
        reputation: INITIAL_REPUTATION - 50 // Menor reputação com a comunidade local
      };
    case GameRole.FAMILY_FARMER:
      return {
        money: INITIAL_MONEY,
        influence: INITIAL_INFLUENCE,
        reputation: INITIAL_REPUTATION + 100 // Maior reputação com a comunidade
      };
    case GameRole.POLITICIAN:
      return {
        money: INITIAL_MONEY + 500,
        influence: INITIAL_INFLUENCE + 200, // Maior influência política
        reputation: INITIAL_REPUTATION
      };
    case GameRole.ACTIVIST:
      return {
        money: INITIAL_MONEY - 300, // Menos recursos financeiros
        influence: INITIAL_INFLUENCE + 50,
        reputation: INITIAL_REPUTATION + 200 // Alta reputação com a comunidade
      };
    default:
      return {
        money: INITIAL_MONEY,
        influence: INITIAL_INFLUENCE,
        reputation: INITIAL_REPUTATION
      };
  }
}

// Initial game state
const initialState: GameState = {
  week: 1,
  year: 1,
  season: Season.SPRING,
  weather: Weather.SUNNY,
  money: INITIAL_MONEY,
  influence: INITIAL_INFLUENCE,
  reputation: INITIAL_REPUTATION,
  farmName: "Fazenda Esperança",
  playerRole: GameRole.FAMILY_FARMER, // Papel padrão
  plots: initializePlots(),
  events: [],
  activeEvents: [],
  marketConditions: [],
  assemblyScheduled: false,
  lastHarvestedCrops: {},
  // Sistema econômico
  globalMarket: initializeGlobalMarket(),
  exportDestination: MarketRegion.LOCAL,
  exportContracts: [],
  // Estado do fim de jogo
  gameCompleted: false,
  victory: null
};

// Game reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_FARM_NAME':
      return { ...state, farmName: action.payload };
      
    case 'ADVANCE_WEEK':
      const newWeek = state.week + 1;
      const newYear = newWeek > WEEKS_PER_SEASON * 4 ? state.year + 1 : state.year;
      const adjustedWeek = newWeek > WEEKS_PER_SEASON * 4 ? 1 : newWeek;
      const newSeason = getCurrentSeason(adjustedWeek);
      const newWeather = generateWeatherCondition(newSeason);
      
      // Update crop growth in all plots
      const updatedPlots = state.plots.map(plot => {
        if (plot.crop) {
          const cropDetails = crops.find(c => c.id === plot.crop?.cropId);
          if (!cropDetails) return plot;
          
          const updatedGrowth = calculateCropGrowth(
            plot.crop, 
            cropDetails, 
            newSeason,
            newWeather
          );
          
          return {
            ...plot,
            crop: updatedGrowth
          };
        }
        return plot;
      });
      
      // Generate random events
      const newEvents = generateRandomEvents(adjustedWeek, newSeason);
      const existingEvents = [...state.events];
      
      // Chance to generate assembly event
      const shouldScheduleAssembly = !state.assemblyScheduled && Math.random() < 0.2;
      const assemblyEvent = shouldScheduleAssembly ? generateAssemblyEvent(adjustedWeek, newSeason) : null;
      
      if (assemblyEvent) {
        newEvents.push(assemblyEvent);
      }
      
      // Combine all events
      const allEvents = [...existingEvents, ...newEvents];
      
      // Determine active events for this week
      const activeEvents = allEvents.filter(e => 
        e.week === adjustedWeek && !e.resolved
      );
      
      // Atualizar mercado global
      // Garantir que o globalMarket existe
      const currentGlobalMarket = state.globalMarket || initializeGlobalMarket();
      const updatedGlobalMarket = updateGlobalMarket(
        currentGlobalMarket,
        adjustedWeek,
        newSeason
      );
      
      // Atualizar contratos de exportação
      const updatedContracts = state.exportContracts.map(contract => {
        // Verificar se o contrato expirou
        if (adjustedWeek > contract.startWeek + contract.duration && !contract.fulfilled) {
          return { ...contract, fulfilled: true };
        }
        return contract;
      });
      
      // Estado atualizado
      const updatedState = {
        ...state,
        week: adjustedWeek,
        year: newYear,
        season: newSeason,
        weather: newWeather,
        plots: updatedPlots,
        events: allEvents,
        activeEvents,
        assemblyScheduled: shouldScheduleAssembly || state.assemblyScheduled,
        globalMarket: updatedGlobalMarket,
        exportContracts: updatedContracts
      };
      
      // Verificar condições de vitória
      if (!state.gameCompleted) {
        const victoryState = checkVictoryConditions(updatedState);
        
        if (victoryState) {
          // Criar evento de vitória
          const victoryEvent = createVictoryEvent(victoryState);
          
          // Adicionar evento à lista de eventos ativos
          return {
            ...updatedState,
            events: [...updatedState.events, victoryEvent],
            activeEvents: [...updatedState.activeEvents, victoryEvent],
            gameCompleted: true,
            victory: victoryState
          };
        }
      }
      
      return updatedState;
    
    case 'PLANT_CROP':
      const { plotId, cropId } = action.payload;
      const plotIndex = state.plots.findIndex(plot => plot.id === plotId);
      
      if (plotIndex === -1) return state;
      
      const selectedCrop = crops.find(crop => crop.id === cropId);
      if (!selectedCrop) return state;
      
      // Check if player has enough money
      const plantingCost = Math.floor(selectedCrop.basePrice * 0.2); // Cost to plant is 20% of market value
      if (state.money < plantingCost) return state;
      
      const newPlots = [...state.plots];
      newPlots[plotIndex] = {
        ...newPlots[plotIndex],
        crop: {
          cropId,
          plantedWeek: state.week,
          growthStage: 0,
          readyToHarvest: false
        }
      };
      
      return {
        ...state,
        plots: newPlots,
        money: state.money - plantingCost
      };
    
    case 'HARVEST_CROP':
      const { harvestPlotId } = action.payload;
      const harvestPlotIndex = state.plots.findIndex(plot => plot.id === harvestPlotId);
      
      if (harvestPlotIndex === -1) return state;
      
      const plot = state.plots[harvestPlotIndex];
      if (!plot.crop || !plot.crop.readyToHarvest) return state;
      
      const harvestedCrop = crops.find(c => c.id === plot.crop?.cropId);
      if (!harvestedCrop) return state;
      
      // Calculate harvest value with market fluctuations
      const harvestYield = harvestedCrop.yield;
      
      // Use current market price from player's selected export destination
      const exportDestination = state.exportDestination;
      
      // Calcular preço do mercado na região selecionada
      // Garantir que globalMarket existe
      const harvestGlobalMarket = state.globalMarket || initializeGlobalMarket();
      const marketPrice = calculateCropPriceInRegion(
        harvestedCrop.id,
        exportDestination,
        harvestGlobalMarket
      );
      
      // Apply any active market conditions
      const cropMarketCondition = state.marketConditions.find(mc => mc.cropId === harvestedCrop.id);
      const priceModifier = cropMarketCondition ? cropMarketCondition.priceModifier : 1.0;
      
      const finalPrice = marketPrice * priceModifier;
      const harvestValue = harvestYield * finalPrice;
      
      // Update harvested crops record
      const updatedHarvestedCrops = { ...state.lastHarvestedCrops };
      const currentAmount = updatedHarvestedCrops[harvestedCrop.id] || 0;
      updatedHarvestedCrops[harvestedCrop.id] = currentAmount + harvestYield;
      
      // Update plot
      const harvestPlots = [...state.plots];
      harvestPlots[harvestPlotIndex] = {
        ...harvestPlots[harvestPlotIndex],
        crop: null
      };
      
      // Estado atualizado após a colheita
      const updatedHarvestState = {
        ...state,
        plots: harvestPlots,
        money: state.money + harvestValue,
        lastHarvestedCrops: updatedHarvestedCrops
      };
      
      // Verificar condições de vitória após colheita
      if (!state.gameCompleted) {
        const victoryState = checkVictoryConditions(updatedHarvestState);
        
        if (victoryState) {
          // Criar evento de vitória
          const victoryEvent = createVictoryEvent(victoryState);
          
          // Adicionar evento à lista de eventos ativos
          return {
            ...updatedHarvestState,
            events: [...state.events, victoryEvent],
            activeEvents: [...state.activeEvents, victoryEvent],
            gameCompleted: true,
            victory: victoryState
          };
        }
      }
      
      return updatedHarvestState;
    
    case 'RESOLVE_EVENT':
      const { eventId, optionId } = action.payload;
      const eventIndex = state.events.findIndex(event => event.id === eventId);
      
      if (eventIndex === -1) return state;
      
      const event = state.events[eventIndex];
      let outcomes = event.impact;
      
      // If option was selected, use its outcomes
      if (optionId) {
        const selectedOption = event.options?.find(opt => opt.id === optionId);
        if (selectedOption) {
          outcomes = selectedOption.outcomes;
        }
      }
      
      // Apply event impacts
      const newMoney = state.money + (outcomes.money || 0);
      const newInfluence = state.influence + (outcomes.influence || 0);
      const newReputation = state.reputation + (outcomes.reputation || 0);
      
      // Mark event as resolved
      const updatedEvents = [...state.events];
      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        resolved: true
      };
      
      // If it was an assembly event, mark it as handled
      const wasAssembly = event.type === EventType.ASSEMBLY;
      
      // Verificar se é um evento de vitória
      const isVictoryEvent = event.type === EventType.VICTORY;
      
      // Remove from active events
      const remainingActiveEvents = state.activeEvents.filter(e => e.id !== eventId);
      
      return {
        ...state,
        money: newMoney,
        influence: newInfluence,
        reputation: newReputation,
        events: updatedEvents,
        activeEvents: remainingActiveEvents,
        assemblyScheduled: wasAssembly ? false : state.assemblyScheduled,
        // O evento de vitória já foi resolvido, mas o jogo continua completo
        gameCompleted: isVictoryEvent ? true : state.gameCompleted
      };
    
    case 'ACQUIRE_LAND':
      const { landPlotId } = action.payload;
      const landPlotIndex = state.plots.findIndex(plot => plot.id === landPlotId);
      
      if (landPlotIndex === -1) return state;
      
      const landPlot = state.plots[landPlotIndex];
      
      // Check if land is acquirable
      if (landPlot.type === LandType.LOCKED || landPlot.owned) {
        return state;
      }
      
      // Check thresholds for acquiring land
      const ownedPlotsCount = state.plots.filter(p => p.owned).length;
      const requiredThreshold = LAND_ACQUISITION_THRESHOLDS[Math.min(ownedPlotsCount - INITIAL_PLOTS, LAND_ACQUISITION_THRESHOLDS.length - 1)];
      
      if (state.influence < requiredThreshold.influence || state.reputation < requiredThreshold.reputation) {
        return state;
      }
      
      // Cost to acquire land
      const acquisitionCost = 500 * ownedPlotsCount;
      if (state.money < acquisitionCost) {
        return state;
      }
      
      // Update plot ownership
      const acquisitionPlots = [...state.plots];
      acquisitionPlots[landPlotIndex] = {
        ...acquisitionPlots[landPlotIndex],
        owned: true,
        type: LandType.PLAYER
      };
      
      // Estado atualizado após adquirir terra
      const updatedLandState = {
        ...state,
        plots: acquisitionPlots,
        money: state.money - acquisitionCost,
        influence: state.influence - Math.floor(requiredThreshold.influence * 0.5), // Use half the influence
        reputation: state.reputation - Math.floor(requiredThreshold.reputation * 0.3) // Use some reputation
      };
      
      // Verificar condições de vitória após adquirir terra
      if (!state.gameCompleted) {
        const victoryState = checkVictoryConditions(updatedLandState);
        
        if (victoryState) {
          // Criar evento de vitória
          const victoryEvent = createVictoryEvent(victoryState);
          
          // Adicionar evento à lista de eventos ativos
          return {
            ...updatedLandState,
            events: [...state.events, victoryEvent],
            activeEvents: [...state.activeEvents, victoryEvent],
            gameCompleted: true,
            victory: victoryState
          };
        }
      }
      
      return updatedLandState;
      
    case 'LOAD_GAME':
      return action.payload;
    
    // Ações para o sistema econômico
    case 'SET_EXPORT_DESTINATION':
      return {
        ...state,
        exportDestination: action.payload
      };
      
    case 'CREATE_EXPORT_CONTRACT':
      const { cropId: contractCropId, quantity, region, pricePerUnit, duration } = action.payload;
      const newContract: ExportContract = {
        id: nanoid(),
        cropId: contractCropId,
        quantity,
        pricePerUnit,
        region,
        startWeek: state.week,
        duration,
        fulfilled: false
      };
      
      return {
        ...state,
        exportContracts: [...state.exportContracts, newContract],
        // Aumentar a reputação ao firmar contratos internacionais
        reputation: state.reputation + (region !== MarketRegion.LOCAL ? 5 : 0)
      };
      
    case 'FULFILL_EXPORT_CONTRACT':
      const { contractId, cropAmount } = action.payload;
      const contractIndex = state.exportContracts.findIndex(c => c.id === contractId);
      
      if (contractIndex === -1 || state.exportContracts[contractIndex].fulfilled) {
        return state;
      }
      
      const contract = state.exportContracts[contractIndex];
      
      // Verificar se há quantidade suficiente da cultura colhida
      const harvestedAmount = state.lastHarvestedCrops[contract.cropId] || 0;
      if (harvestedAmount < cropAmount) {
        return state; // Não há colheita suficiente para cumprir o contrato
      }
      
      // Calcular o valor recebido pelo cumprimento parcial ou total do contrato
      const contractPayment = cropAmount * contract.pricePerUnit;
      
      // Atualizar o contrato
      const fulfilledContract = cropAmount >= contract.quantity;
      const updatedExportContracts = [...state.exportContracts];
      updatedExportContracts[contractIndex] = {
        ...contract,
        fulfilled: fulfilledContract
      };
      
      // Atualizar quantidade de culturas colhidas
      const newHarvestedCrops = { ...state.lastHarvestedCrops };
      newHarvestedCrops[contract.cropId] = harvestedAmount - cropAmount;
      
      // Recompensas adicionais para contratos com regiões estrangeiras
      let influenceGain = 0;
      if (contract.region !== MarketRegion.LOCAL && contract.region !== MarketRegion.NATIONAL) {
        influenceGain = fulfilledContract ? 10 : 5;
      }
      
      // Estado atualizado após cumprir contrato
      const updatedContractState = {
        ...state,
        money: state.money + contractPayment,
        influence: state.influence + influenceGain,
        exportContracts: updatedExportContracts,
        lastHarvestedCrops: newHarvestedCrops
      };
      
      // Verificar condições de vitória após cumprir contrato
      if (!state.gameCompleted) {
        const victoryState = checkVictoryConditions(updatedContractState);
        
        if (victoryState) {
          // Criar evento de vitória
          const victoryEvent = createVictoryEvent(victoryState);
          
          // Adicionar evento à lista de eventos ativos
          return {
            ...updatedContractState,
            events: [...state.events, victoryEvent],
            activeEvents: [...state.activeEvents, victoryEvent],
            gameCompleted: true,
            victory: victoryState
          };
        }
      }
      
      return updatedContractState;
      
    // Ação especial para testar o sistema de vitória
    case 'TEST_VICTORY':
      // Criar um estado modificado com alta quantidade de dinheiro que aciona a vitória
      const testState = {
        ...state,
        money: VICTORY_MONEY
      };
      
      // Verificar condições de vitória
      const victoryState = checkVictoryConditions(testState);
      
      if (victoryState) {
        // Criar evento de vitória
        const victoryEvent = createVictoryEvent(victoryState);
        
        // Adicionar evento à lista de eventos ativos
        return {
          ...testState,
          events: [...state.events, victoryEvent],
          activeEvents: [...state.activeEvents, victoryEvent],
          gameCompleted: true,
          victory: victoryState
        };
      }
      
      return testState;
      
    default:
      return state;
  }
}

// Create game context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Game provider
interface GameProviderProps {
  children: ReactNode;
  initialFarmName?: string;
  selectedRole?: GameRole;
}

export function GameProvider({ children, initialFarmName, selectedRole = GameRole.FAMILY_FARMER }: GameProviderProps) {
  // Configure recursos iniciais com base no papel escolhido
  const roleResources = getInitialResourcesByRole(selectedRole);
  
  // Initialize state with farm name and role if provided
  const initialGameState = {
    ...initialState,
    farmName: initialFarmName || initialState.farmName,
    playerRole: selectedRole,
    money: roleResources.money,
    influence: roleResources.influence,
    reputation: roleResources.reputation
  };
  
  // Try to load saved game
  const loadedState = localStorage.getItem('agronegocio_game');
  
  let startingState;
  
  if (loadedState) {
    const parsedState = JSON.parse(loadedState);
    // Garantir que as propriedades econômicas existam
    startingState = {
      ...parsedState,
      globalMarket: parsedState.globalMarket || initializeGlobalMarket(),
      exportDestination: parsedState.exportDestination || MarketRegion.LOCAL,
      exportContracts: parsedState.exportContracts || [],
      // Propriedades do sistema de vitória
      gameCompleted: parsedState.gameCompleted || false,
      victory: parsedState.victory || null,
      // Garantir que o papel do jogador esteja definido
      playerRole: parsedState.playerRole || selectedRole
    };
  } else {
    startingState = initialGameState;
  }
  
  const [state, dispatch] = useReducer(gameReducer, startingState);
  
  // Save game state
  useEffect(() => {
    localStorage.setItem('agronegocio_game', JSON.stringify(state));
  }, [state]);
  
  return React.createElement(GameContext.Provider, { value: { state, dispatch } }, children);
}

// Custom hook to use the game context
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
