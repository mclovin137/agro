// Constantes para o jogo "Agronegócio e Poder – O Jogo da Hegemonia"
import { PlayerRole, ResourceType } from "./gameTypes";

// Anos de início e fim do jogo
export const START_YEAR = 1960; // Início da Revolução Verde no Brasil
export const END_YEAR = 2023;
export const YEARS_PER_TURN = 3; // Cada turno avança 3 anos

// Recursos iniciais baseados no papel do jogador
export type ResourceCalculator = (role: PlayerRole) => Record<ResourceType, number>;

export const INITIAL_RESOURCES: ResourceCalculator = (role: PlayerRole) => {
  switch (role) {
    case PlayerRole.AGRIBUSINESS:
      return {
        [ResourceType.ECONOMIC]: 1000, // Capital inicial alto
        [ResourceType.INFLUENCE]: 800, // Influência política alta
        [ResourceType.SOCIAL]: 200, // Apoio social baixo
        [ResourceType.ENVIRONMENTAL]: 300 // Consciência ambiental moderada baixa
      };
    case PlayerRole.FAMILY_FARMER:
      return {
        [ResourceType.ECONOMIC]: 400, // Capital inicial baixo
        [ResourceType.INFLUENCE]: 200, // Influência política baixa
        [ResourceType.SOCIAL]: 700, // Apoio social alto
        [ResourceType.ENVIRONMENTAL]: 800 // Consciência ambiental alta
      };
    case PlayerRole.POLITICIAN:
      return {
        [ResourceType.ECONOMIC]: 800, // Capital inicial moderado alto
        [ResourceType.INFLUENCE]: 1000, // Influência política muito alta
        [ResourceType.SOCIAL]: 500, // Apoio social moderado
        [ResourceType.ENVIRONMENTAL]: 400 // Consciência ambiental moderada
      };
    case PlayerRole.ACTIVIST:
      return {
        [ResourceType.ECONOMIC]: 300, // Capital inicial muito baixo
        [ResourceType.INFLUENCE]: 500, // Influência política moderada
        [ResourceType.SOCIAL]: 1000, // Apoio social muito alto
        [ResourceType.ENVIRONMENTAL]: 900 // Consciência ambiental muito alta
      };
    default:
      return {
        [ResourceType.ECONOMIC]: 500,
        [ResourceType.INFLUENCE]: 500,
        [ResourceType.SOCIAL]: 500,
        [ResourceType.ENVIRONMENTAL]: 500
      };
  }
};

// Limites de recursos
export const MAX_RESOURCE_VALUE = 2000;
export const MIN_RESOURCE_VALUE = 0;

// Condições de vitória específicas para cada papel
export const VICTORY_CONDITIONS = {
  [PlayerRole.AGRIBUSINESS]: {
    [ResourceType.ECONOMIC]: 1500,
    territoriesControlled: 10
  },
  [PlayerRole.FAMILY_FARMER]: {
    [ResourceType.ECONOMIC]: 1000,
    [ResourceType.ENVIRONMENTAL]: 1200,
    territoriesControlled: 7
  },
  [PlayerRole.POLITICIAN]: {
    [ResourceType.INFLUENCE]: 1500,
    [ResourceType.SOCIAL]: 1000
  },
  [PlayerRole.ACTIVIST]: {
    [ResourceType.SOCIAL]: 1500,
    [ResourceType.ENVIRONMENTAL]: 1200,
    landReformAchieved: true
  }
};

// Condições de derrota específicas para cada papel
export const DEFEAT_CONDITIONS = {
  [PlayerRole.AGRIBUSINESS]: {
    [ResourceType.ECONOMIC]: 100, // Falência econômica
    [ResourceType.INFLUENCE]: 100 // Perda de influência política
  },
  [PlayerRole.FAMILY_FARMER]: {
    [ResourceType.ECONOMIC]: 50, // Falência econômica
    [ResourceType.SOCIAL]: 100 // Perda de apoio comunitário
  },
  [PlayerRole.POLITICIAN]: {
    [ResourceType.INFLUENCE]: 150, // Perda de capital político
    [ResourceType.SOCIAL]: 150 // Rejeição popular
  },
  [PlayerRole.ACTIVIST]: {
    [ResourceType.SOCIAL]: 150, // Esvaziamento do movimento
    [ResourceType.INFLUENCE]: 50 // Marginalização política
  }
};

// Custos de ações
export const ACTION_COSTS = {
  acquireTerritory: {
    base: 200,
    influence: 100
  },
  improveProduction: {
    base: 50,
    multiplier: 0.5 // Custo adicional baseado no nível atual
  },
  sustainablePractices: {
    economic: 100,
    environmentalGain: 20
  },
  politicalCampaign: {
    economic: 200,
    influenceGain: 100,
    socialGain: 50
  },
  socialMovement: {
    economic: 100,
    socialGain: 150,
    influenceGain: 50
  }
};

// Dados históricos da agricultura brasileira
export const HISTORICAL_AGRICULTURAL_DATA = [
  {
    year: 1960,
    event: "Início da Revolução Verde no Brasil",
    impact: "Introdução de tecnologias agrícolas modernas"
  },
  {
    year: 1965,
    event: "Criação do Sistema Nacional de Crédito Rural",
    impact: "Facilitação de financiamento para grandes produtores"
  },
  {
    year: 1973,
    event: "Criação da EMBRAPA",
    impact: "Pesquisa agrícola institucionalizada"
  },
  {
    year: 1975,
    event: "Programa Nacional do Álcool (Proálcool)",
    impact: "Expansão das monoculturas de cana-de-açúcar"
  },
  {
    year: 1984,
    event: "Fundação do Movimento dos Trabalhadores Rurais Sem Terra (MST)",
    impact: "Organização da luta pela reforma agrária"
  },
  {
    year: 1995,
    event: "Criação do PRONAF",
    impact: "Apoio à agricultura familiar"
  },
  {
    year: 2000,
    event: "Boom das Commodities",
    impact: "Expansão do agronegócio exportador"
  },
  {
    year: 2012,
    event: "Novo Código Florestal",
    impact: "Flexibilização das leis ambientais"
  },
  {
    year: 2020,
    event: "Pandemia de COVID-19",
    impact: "Disrupção nas cadeias produtivas agrícolas"
  }
];

// Descrições dos papéis disponíveis
export const ROLE_DESCRIPTIONS = {
  [PlayerRole.AGRIBUSINESS]: {
    title: "Grande Produtor Rural",
    description: "Represente os interesses do agronegócio, expandindo sua produção e influência política para garantir benefícios para o setor.",
    strengths: [
      "Capital inicial alto",
      "Forte influência política",
      "Acesso a tecnologias avançadas"
    ],
    weaknesses: [
      "Baixo apoio popular",
      "Desafios ambientais",
      "Dependência de políticas favoráveis"
    ]
  },
  [PlayerRole.FAMILY_FARMER]: {
    title: "Agricultor Familiar",
    description: "Focado em produção sustentável e diversificada, busque o fortalecimento da agricultura familiar como alternativa ao modelo industrial.",
    strengths: [
      "Forte apoio comunitário",
      "Práticas ambientais sustentáveis",
      "Produção diversificada"
    ],
    weaknesses: [
      "Capital inicial limitado",
      "Pouca influência política",
      "Dificuldades de acesso a mercados"
    ]
  },
  [PlayerRole.POLITICIAN]: {
    title: "Político/Legislador",
    description: "Equilibre interesses divergentes enquanto constrói sua base política, criando leis e políticas que moldarão o futuro da agricultura brasileira.",
    strengths: [
      "Altíssima influência política",
      "Capacidade de moldar políticas",
      "Acesso a recursos governamentais"
    ],
    weaknesses: [
      "Pressões de diferentes grupos",
      "Necessidade de manter apoio popular",
      "Vulnerabilidade a escândalos"
    ]
  },
  [PlayerRole.ACTIVIST]: {
    title: "Líder Sindical/Ativista",
    description: "Mobilize trabalhadores rurais e movimentos sociais na luta por reforma agrária e direitos, desafiando as estruturas de poder estabelecidas.",
    strengths: [
      "Forte apoio popular",
      "Alta consciência socioambiental",
      "Capacidade de mobilização"
    ],
    weaknesses: [
      "Recursos financeiros limitados",
      "Oposição de setores poderosos",
      "Desafios na institucionalização"
    ]
  }
};