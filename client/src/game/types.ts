import { Season, Weather, LandType, EventType, LandlordResistanceType, AssemblyDecisionType } from './constants';
import { GlobalMarket, MarketRegion } from './economy';

// Re-export types from constants for easier imports
export { LandType, EventType, Season, Weather, LandlordResistanceType, AssemblyDecisionType };

// Enumeração para os papéis do jogo
export enum GameRole {
  AGRIBUSINESS = "agribusiness", // Grande produtor rural
  FAMILY_FARMER = "family_farmer", // Agricultor familiar
  POLITICIAN = "politician", // Político ou legislador
  ACTIVIST = "activist" // Líder sindical ou ativista rural
}

export interface Crop {
  id: string;
  name: string;
  basePrice: number;
  yield: number;
  seasons: Season[];
  growthTime: number;
  imageUrl: string;
}

export interface Plot {
  id: string;
  x: number;
  y: number;
  type: LandType;
  owned: boolean;
  crop?: PlantedCrop | null;
}

export interface PlantedCrop {
  cropId: string;
  plantedWeek: number;
  growthStage: number; // 0-100%
  readyToHarvest: boolean;
}

export interface GameEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  week: number;
  impact: EventImpact;
  options?: EventOption[];
  resolved: boolean;
}

export interface EventImpact {
  money?: number;
  influence?: number;
  reputation?: number;
  cropGrowth?: number;
  marketPrices?: { [cropId: string]: number };
}

export interface EventOption {
  id: string;
  text: string;
  outcomes: EventImpact;
}

export interface LandlordResistance {
  type: LandlordResistanceType;
  title: string;
  description: string;
  impact: EventImpact;
  options?: EventOption[];
}

export interface AssemblyDecision {
  type: AssemblyDecisionType;
  title: string;
  description: string;
  influenceGain: number;
  reputationGain: number;
  riskLevel: number; // 1-5
}

export interface WeatherCondition {
  type: Weather;
  description: string;
  cropGrowthModifier: number;
  duration: number; // in weeks
}

export interface MarketCondition {
  cropId: string;
  priceModifier: number;
  reason: string;
}

// Enumeração para as condições de vitória
export enum VictoryType {
  LAND = "Conquista de terras",
  MONEY = "Poder econômico",
  INFLUENCE = "Líder da comunidade",
  REPUTATION = "Revolução agrária"
}

// Interface para vitória no jogo
export interface VictoryState {
  achieved: boolean;
  type: VictoryType;
  week: number;
  year: number;
}

export interface GameState {
  week: number;
  year: number;
  season: Season;
  weather: Weather;
  money: number;
  influence: number;
  reputation: number;
  farmName: string;
  playerRole: GameRole;
  plots: Plot[];
  events: GameEvent[];
  activeEvents: GameEvent[];
  marketConditions: MarketCondition[];
  assemblyScheduled: boolean;
  lastHarvestedCrops: { [cropId: string]: number };
  // Sistema econômico global
  globalMarket: GlobalMarket;
  exportDestination: MarketRegion; // Destino atual de exportação
  exportContracts: ExportContract[];
  // Estado de vitória
  gameCompleted: boolean;
  victory: VictoryState | null;
}

export interface ExportContract {
  id: string;
  cropId: string;
  quantity: number;
  pricePerUnit: number;
  region: MarketRegion;
  startWeek: number;
  duration: number; // em semanas
  fulfilled: boolean;
}

export interface GameAction {
  type: string;
  payload?: any;
}
