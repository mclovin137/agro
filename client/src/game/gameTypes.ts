// Definições de tipos para o jogo "Agronegócio e Poder – O Jogo da Hegemonia"
import { nanoid } from 'nanoid';

// Papéis do jogador
export enum PlayerRole {
  AGRIBUSINESS = "agribusiness", // Grande produtor rural
  FAMILY_FARMER = "family_farmer", // Agricultor familiar
  POLITICIAN = "politician", // Político/Legislador
  ACTIVIST = "activist" // Líder sindical/Ativista
}

// Tipos de recursos
export enum ResourceType {
  ECONOMIC = "economic", // Recurso econômico (dinheiro, bens)
  INFLUENCE = "influence", // Influência política
  SOCIAL = "social", // Capital social, apoio popular
  ENVIRONMENTAL = "environmental" // Saúde ambiental
}

// Tipos de território
export enum TerritoryType {
  AGRIBUSINESS = "agribusiness", // Latifúndio de agronegócio
  FAMILY_FARM = "family_farm", // Agricultura familiar
  PROTECTED = "protected", // Área de preservação
  INDIGENOUS = "indigenous", // Terra indígena
  URBAN = "urban", // Área urbana
  UNOCCUPIED = "unoccupied" // Terra desocupada
}

// Tipos de produção
export enum ProductionType {
  SOY = "soy", // Soja
  CORN = "corn", // Milho
  CATTLE = "cattle", // Pecuária
  COFFEE = "coffee", // Café
  FRUIT = "fruit", // Frutas
  VEGETABLE = "vegetable", // Hortaliças
  ORGANIC = "organic" // Cultivo orgânico
}

// Tipos de eventos
export enum EventType {
  TECHNOLOGICAL = "technological", // Eventos relacionados a tecnologia
  POLITICAL = "political", // Eventos políticos
  SOCIAL = "social", // Eventos sociais
  ECONOMIC = "economic", // Eventos econômicos
  ENVIRONMENTAL = "environmental" // Eventos ambientais
}

// Interface para território
export interface Territory {
  id: string;
  name: string;
  type: TerritoryType;
  owner: PlayerRole | null;
  production: ProductionType | null;
  productionLevel: number; // 0-100
  environmentalHealth: number; // 0-100
  position: { x: number; y: number };
  neighbors: string[]; // IDs dos territórios vizinhos
}

// Interface para consequência de evento
export interface EventConsequence {
  resourceType: ResourceType;
  value: number;
  description: string;
}

// Interface para opção de evento
export interface EventOption {
  id: string;
  text: string;
  consequences: EventConsequence[];
}

// Interface para evento do jogo
export interface GameEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  year: number;
  options: EventOption[];
  resolved: boolean;
  imageUrl?: string; // URL opcional para imagem do evento
}

// Interface para dados históricos
export interface HistoricalData {
  year: number;
  economicResource: number;
  influenceResource: number;
  socialResource: number;
  environmentalResource: number;
  territoriesOwned: number;
}

// Interface para o estado do jogo
export interface GameState {
  playerName: string;
  playerRole: PlayerRole;
  resources: Record<ResourceType, number>;
  territories: Territory[];
  events: GameEvent[];
  activeEvents: GameEvent[];
  completedEvents: GameEvent[];
  currentYear: number;
  startYear: number;
  endYear: number;
  historicalData: HistoricalData[];
  gameCompleted: boolean;
  victory: boolean;
  defeatReason?: string;
}

// Tipos de ações do jogo
export type GameAction =
  | { type: "ADVANCE_YEAR" }
  | { type: "RESOLVE_EVENT"; payload: { eventId: string; optionId: string } }
  | { type: "ACQUIRE_TERRITORY"; payload: { territoryId: string } }
  | { type: "SET_PRODUCTION"; payload: { territoryId: string; productionType: ProductionType } }
  | { type: "IMPROVE_PRODUCTION"; payload: { territoryId: string } }
  | { type: "IMPLEMENT_SUSTAINABLE_PRACTICES"; payload: { territoryId: string } }
  | { type: "CONDUCT_POLITICAL_CAMPAIGN" }
  | { type: "ORGANIZE_SOCIAL_MOVEMENT" };