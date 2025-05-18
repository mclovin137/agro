// Game constants
export const INITIAL_MONEY = 1000;
export const INITIAL_INFLUENCE = 0;
export const INITIAL_REPUTATION = 0;
export const INITIAL_PLOTS = 2;
export const MAX_LAND_PLOTS = 36;

// Condições de vitória
export const VICTORY_LAND_PLOTS = 30; // Número de lotes para vencer
export const VICTORY_INFLUENCE = 1000; // Influência total necessária
export const VICTORY_REPUTATION = 1000; // Reputação total necessária
export const VICTORY_MONEY = 100000; // Dinheiro necessário para vitória

// Time constants
export const WEEKS_PER_SEASON = 13;
export const SEASONS_PER_YEAR = 4;
export const TOTAL_WEEKS_IN_YEAR = WEEKS_PER_SEASON * SEASONS_PER_YEAR;

// Seasons
export enum Season {
  SPRING = "Primavera",
  SUMMER = "Verão",
  FALL = "Outono",
  WINTER = "Inverno"
}

// Weather conditions
export enum Weather {
  SUNNY = "Ensolarado",
  RAINY = "Chuvoso",
  CLOUDY = "Nublado",
  STORMY = "Tempestade",
  DROUGHT = "Seca"
}

// Land types
export enum LandType {
  PLAYER = "player",
  LANDLORD = "landlord",
  COOPERATIVE = "cooperative",
  LOCKED = "locked"
}

// Event types
export enum EventType {
  WEATHER = "weather",
  MARKET = "market",
  LANDLORD = "landlord",
  COMMUNITY = "community",
  ASSEMBLY = "assembly",
  VICTORY = "victory"
}

// Landlord resistance events
export enum LandlordResistanceType {
  COMMERCIAL_BLOCKADE = "commercial_blockade",
  EXTRA_TAXES = "extra_taxes",
  SABOTAGE = "sabotage",
  LEGAL_THREATS = "legal_threats",
  INTIMIDATION = "intimidation"
}

// Assembly decisions
export enum AssemblyDecisionType {
  PEACEFUL = "peaceful",
  CONFRONTATIONAL = "confrontational",
  DIPLOMATIC = "diplomatic",
  COMMUNITY_FOCUSED = "community_focused"
}

// Land acquisition thresholds
export const LAND_ACQUISITION_THRESHOLDS = [
  { influence: 10, reputation: 5 },
  { influence: 25, reputation: 15 },
  { influence: 50, reputation: 30 },
  { influence: 100, reputation: 50 },
  { influence: 200, reputation: 100 }
];

// Market fluctuation range
export const MARKET_FLUCTUATION_MIN = 0.85;
export const MARKET_FLUCTUATION_MAX = 1.15;
