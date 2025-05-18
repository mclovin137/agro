import { nanoid } from 'nanoid';
import { Season, Weather, EventType, LandlordResistanceType } from './constants';
import { GameEvent, LandlordResistance } from './types';

// Random weather events
const weatherEvents: Partial<GameEvent>[] = [
  {
    type: EventType.WEATHER,
    title: "Condições Ideais para Mandioca",
    description: "As condições climáticas estão excepcionalmente favoráveis para o cultivo de mandioca nesta estação.",
    impact: { 
      marketPrices: { "mandioca": 1.2 },
      cropGrowth: 10
    },
    options: [
      {
        id: nanoid(),
        text: "Expandir a área de plantio de mandioca (custa R$ 250)",
        outcomes: { money: -250, cropGrowth: 20, marketPrices: { "mandioca": 1.3 } }
      },
      {
        id: nanoid(),
        text: "Manter o plantio atual e aproveitar as condições",
        outcomes: { cropGrowth: 15 }
      }
    ]
  },
  {
    type: EventType.WEATHER,
    title: "Chuvas Intensas",
    description: "Fortes chuvas atingiram a região nos últimos dias. Algumas culturas podem se beneficiar, mas há risco de alagamentos.",
    impact: { cropGrowth: 15 },
    options: [
      {
        id: nanoid(),
        text: "Implementar sistema de drenagem (custa R$ 200)",
        outcomes: { money: -200, cropGrowth: 30 }
      },
      {
        id: nanoid(),
        text: "Deixar a natureza seguir seu curso",
        outcomes: { cropGrowth: 10 }
      }
    ]
  },
  {
    type: EventType.WEATHER,
    title: "Seca Prolongada",
    description: "Uma seca atingiu a região, reduzindo o crescimento das plantações.",
    impact: { cropGrowth: -20 },
    options: [
      {
        id: nanoid(),
        text: "Investir em irrigação (custa R$ 300)",
        outcomes: { money: -300, cropGrowth: 10 }
      },
      {
        id: nanoid(),
        text: "Economizar água e esperar por chuvas",
        outcomes: { cropGrowth: -15, influence: 5 }
      }
    ]
  },
  {
    type: EventType.WEATHER,
    title: "Geada Fora de Época",
    description: "Uma geada inesperada atingiu a região. Culturas sensíveis podem ter sido danificadas.",
    impact: { cropGrowth: -10 },
    options: [
      {
        id: nanoid(),
        text: "Queimar palha para proteger as plantações (custa R$ 150)",
        outcomes: { money: -150, cropGrowth: 0 }
      },
      {
        id: nanoid(),
        text: "Aceitar as perdas e replanejar",
        outcomes: { cropGrowth: -20, reputation: 5 }
      }
    ]
  }
];

// Random market events
const marketEvents: Partial<GameEvent>[] = [
  {
    type: EventType.MARKET,
    title: "Alta na Exportação de Farinha de Mandioca",
    description: "Uma escassez global levou ao aumento da demanda por farinha de mandioca. Os preços subiram significativamente.",
    impact: { 
      marketPrices: { "mandioca": 1.35 }
    },
    options: [
      {
        id: nanoid(),
        text: "Expandir a produção de mandioca (custa R$ 300)",
        outcomes: { money: -300, marketPrices: { "mandioca": 1.5 } }
      },
      {
        id: nanoid(),
        text: "Vender a produção atual pelos preços elevados",
        outcomes: { money: 150 }
      }
    ]
  },
  {
    type: EventType.MARKET,
    title: "Alta Demanda por Alimentos",
    description: "A demanda por produtos agrícolas aumentou. Você pode conseguir preços melhores por suas colheitas.",
    impact: { 
      marketPrices: { 
        "soja": 1.2, 
        "milho": 1.2, 
        "feijao": 1.25, 
        "cafe": 1.1,
        "cacau": 1.1,
        "algodao": 1.15,
        "mandioca": 1.2
      } 
    }
  },
  {
    type: EventType.MARKET,
    title: "Queda nos Preços de Commodities",
    description: "Os preços das commodities agrícolas caíram no mercado internacional.",
    impact: { 
      marketPrices: { 
        "soja": 0.8, 
        "cafe": 0.85, 
        "algodao": 0.8,
        "milho": 0.85
      } 
    }
  },
  {
    type: EventType.MARKET,
    title: "Aumento da Procura por Produtos Orgânicos",
    description: "Consumidores estão buscando alimentos orgânicos, o que valorizou determinadas culturas.",
    impact: { 
      marketPrices: { 
        "feijao": 1.3, 
        "cacau": 1.25,
        "mandioca": 1.3
      } 
    },
    options: [
      {
        id: nanoid(),
        text: "Converter parte da produção para orgânica (custa R$ 500)",
        outcomes: { 
          money: -500, 
          reputation: 20,
          marketPrices: { 
            "feijao": 1.5, 
            "cacau": 1.4,
            "mandioca": 1.6
          }
        }
      },
      {
        id: nanoid(),
        text: "Manter o modelo de produção atual",
        outcomes: { influence: -5 }
      }
    ]
  }
];

// Landlord resistance events
const landlordResistanceEvents: LandlordResistance[] = [
  {
    type: LandlordResistanceType.COMMERCIAL_BLOCKADE,
    title: "Bloqueio Comercial",
    description: "Os latifundiários locais estão dificultando o acesso ao mercado regional. Os preços de venda estão reduzidos.",
    impact: { 
      marketPrices: { 
        "soja": 0.75, 
        "milho": 0.8, 
        "feijao": 0.8,
        "cafe": 0.85,
        "cacau": 0.85,
        "algodao": 0.8,
        "mandioca": 0.75
      },
      influence: -5
    }
  },
  {
    type: LandlordResistanceType.EXTRA_TAXES,
    title: "Impostos Extras",
    description: "Os fazendeiros influentes conseguiram impor taxas adicionais para pequenos produtores.",
    impact: { 
      money: -200,
      influence: -10
    }
  },
  {
    type: LandlordResistanceType.SABOTAGE,
    title: "Sabotagem nas Plantações",
    description: "Durante a noite, suas plantações foram danificadas. Suspeita-se dos capangas dos latifundiários.",
    impact: { 
      cropGrowth: -30,
      reputation: 10
    }
  },
  {
    type: LandlordResistanceType.LEGAL_THREATS,
    title: "Ameaças Legais",
    description: "Advogados dos latifundiários estão contestando a posse de suas terras.",
    impact: { 
      money: -300,
      influence: -5,
      reputation: 5
    }
  },
  {
    type: LandlordResistanceType.INTIMIDATION,
    title: "Intimidação",
    description: "Funcionários do latifundiário vizinho estão intimidando sua família e trabalhadores.",
    impact: { 
      cropGrowth: -10,
      reputation: 15
    },
    options: [
      {
        id: nanoid(),
        text: "Buscar proteção da polícia",
        outcomes: { money: -100, influence: 5, reputation: -5 }
      },
      {
        id: nanoid(),
        text: "Organizar defesa comunitária",
        outcomes: { influence: 15, reputation: 20 }
      },
      {
        id: nanoid(),
        text: "Negociar diretamente com o latifundiário",
        outcomes: { money: -200, influence: -10, reputation: -10 }
      }
    ]
  }
];

// Community events
const communityEvents: Partial<GameEvent>[] = [
  {
    type: EventType.COMMUNITY,
    title: "Oficina de Processamento de Mandioca",
    description: "A comunidade local está organizando uma oficina para ensinar técnicas tradicionais de processamento de mandioca para produção de farinha e outros derivados.",
    impact: { 
      influence: 5,
      reputation: 10
    },
    options: [
      {
        id: nanoid(),
        text: "Oferecer sua propriedade para sediar o evento (custa R$ 100)",
        outcomes: { money: -100, influence: 15, reputation: 25, marketPrices: { "mandioca": 1.3 } }
      },
      {
        id: nanoid(),
        text: "Participar e compartilhar conhecimentos",
        outcomes: { influence: 10, reputation: 15 }
      },
      {
        id: nanoid(),
        text: "Não participar",
        outcomes: { reputation: -5 }
      }
    ]
  },
  {
    type: EventType.COMMUNITY,
    title: "Festa da Colheita",
    description: "Os moradores locais estão organizando uma festa para celebrar a colheita. Participar pode aumentar sua reputação na comunidade.",
    impact: { 
      money: -50,
      reputation: 10
    },
    options: [
      {
        id: nanoid(),
        text: "Contribuir generosamente (R$ 200)",
        outcomes: { money: -200, reputation: 25, influence: 5 }
      },
      {
        id: nanoid(),
        text: "Participar com uma contribuição modesta",
        outcomes: { money: -50, reputation: 10 }
      },
      {
        id: nanoid(),
        text: "Não participar",
        outcomes: { reputation: -10 }
      }
    ]
  },
  {
    type: EventType.COMMUNITY,
    title: "Troca de Sementes",
    description: "Agricultores locais estão organizando um evento de troca de sementes.",
    impact: { 
      influence: 5,
      reputation: 5
    },
    options: [
      {
        id: nanoid(),
        text: "Compartilhar suas melhores sementes",
        outcomes: { cropGrowth: -5, influence: 15, reputation: 10 }
      },
      {
        id: nanoid(),
        text: "Participar com sementes comuns",
        outcomes: { influence: 5, reputation: 5 }
      },
      {
        id: nanoid(),
        text: "Apenas observar e aprender",
        outcomes: { cropGrowth: 5, reputation: -5 }
      }
    ]
  },
  {
    type: EventType.COMMUNITY,
    title: "Mutirão de Plantio",
    description: "Famílias locais estão se organizando para um mutirão de plantio nas áreas comunitárias.",
    impact: { 
      influence: 10,
      reputation: 15
    },
    options: [
      {
        id: nanoid(),
        text: "Liderar o mutirão",
        outcomes: { money: -100, influence: 25, reputation: 20 }
      },
      {
        id: nanoid(),
        text: "Participar ativamente",
        outcomes: { influence: 15, reputation: 15 }
      },
      {
        id: nanoid(),
        text: "Enviar um trabalhador em seu lugar",
        outcomes: { money: -50, influence: 5, reputation: 5 }
      }
    ]
  }
];

// Assembly events
export function generateAssemblyEvent(week: number, season: Season = Season.SPRING): GameEvent {
  // Títulos e descrições específicas para cada estação
  let title = "Assembleia Rural";
  let description = "Uma assembleia da comunidade rural foi convocada para discutir estratégias de resistência e ampliação territorial.";
  
  // Opções contextuais baseadas na estação
  const baseOptions = [
    {
      id: nanoid(),
      text: "Propor negociação pacífica com os latifundiários",
      outcomes: { influence: 10, reputation: 5 }
    },
    {
      id: nanoid(),
      text: "Defender ações diretas de ocupação territorial",
      outcomes: { influence: 20, reputation: -10 }
    },
    {
      id: nanoid(),
      text: "Sugerir fortalecimento das cooperativas",
      outcomes: { influence: 15, reputation: 15, money: -100 }
    },
    {
      id: nanoid(),
      text: "Propor campanha de conscientização pública",
      outcomes: { influence: 5, reputation: 20, money: -50 }
    }
  ];
  
  // Adiciona opções específicas baseadas na estação atual
  let options = [...baseOptions];
  
  switch (season) {
    case Season.SPRING:
      title = "Assembleia de Planejamento da Primavera";
      description = "Com o início da temporada de plantio, a comunidade se reúne para discutir estratégias colaborativas e resistência aos latifundiários.";
      options.push({
        id: nanoid(),
        text: "Organizar mutirões de plantio coletivo",
        outcomes: { money: -75, influence: 15, reputation: 20, cropGrowth: 10 }
      });
      break;
      
    case Season.SUMMER:
      title = "Assembleia de Veraneio";
      description = "No auge do calor, os agricultores discutem estratégias para enfrentar a seca e gerenciar recursos hídricos.";
      options.push({
        id: nanoid(),
        text: "Propor sistema comunitário de irrigação",
        outcomes: { money: -150, influence: 20, reputation: 10, cropGrowth: 15 }
      });
      break;
      
    case Season.FALL:
      title = "Assembleia da Colheita";
      description = "Com a chegada da época de colheita, a comunidade discute estratégias de mercado e distribuição da produção.";
      options.push({
        id: nanoid(),
        text: "Organizar feira regional de produtores familiares",
        outcomes: { money: -120, influence: 15, reputation: 25, marketPrices: { "feijao": 1.2, "milho": 1.15, "mandioca": 1.2 } }
      });
      break;
      
    case Season.WINTER:
      title = "Assembleia de Inverno";
      description = "No período mais difícil do ano, agricultores se reúnem para discutir estratégias de sobrevivência e resistência ao poder dos latifundiários.";
      options.push({
        id: nanoid(),
        text: "Criar fundo comunitário de apoio para famílias em necessidade",
        outcomes: { money: -200, influence: 25, reputation: 30 }
      });
      break;
  }
  
  return {
    id: nanoid(),
    type: EventType.ASSEMBLY,
    title,
    description,
    week,
    impact: { influence: 5, reputation: 5 },
    options,
    resolved: false
  };
}

// Generate random events based on week and season
// Calculate landlord threat level based on player's influence and reputation
export function getLandlordThreatLevel(influence: number, reputation: number): number {
  // Threat level from 1 (low) to 5 (high)
  // Higher influence and reputation reduce threat
  const baseLevel = 3;
  const influenceReduction = Math.floor(influence / 20);
  const reputationReduction = Math.floor(reputation / 25);
  
  const threatLevel = Math.max(1, Math.min(5, baseLevel - influenceReduction - reputationReduction));
  return threatLevel;
}

export function generateRandomEvents(week: number, season: Season): GameEvent[] {
  const events: GameEvent[] = [];
  
  // Ajusta probabilidades com base na estação
  let weatherChance = 0.15;
  let marketChance = 0.1;
  let landlordChance = 0.2;
  let communityChance = 0.12;
  
  // Modificações baseadas na estação
  switch (season) {
    case Season.SPRING: // Primavera tem mais eventos climáticos favoráveis
      weatherChance = 0.25;
      communityChance = 0.15;
      break;
    case Season.SUMMER: // Verão tem mais eventos de mercado
      marketChance = 0.15;
      landlordChance = 0.18;
      break;
    case Season.FALL: // Outono tem mais eventos comunitários
      communityChance = 0.20;
      break;
    case Season.WINTER: // Inverno tem mais resistência dos latifundiários
      landlordChance = 0.25;
      weatherChance = 0.20; // Mais eventos climáticos severos
      marketChance = 0.08; // Mercado mais estagnado
      break;
  }
  
  // Weather event
  if (Math.random() < weatherChance) {
    // Prioriza certos eventos climáticos com base na estação
    let possibleEvents = [...weatherEvents];
    
    // Filtra ou prioriza eventos baseados na estação se necessário
    // Poderia ser expandido para priorizar eventos específicos por estação
    
    const weatherEvent = { ...possibleEvents[Math.floor(Math.random() * possibleEvents.length)] };
    events.push({
      id: nanoid(),
      week,
      resolved: false,
      ...weatherEvent
    } as GameEvent);
  }
  
  // Market event
  if (Math.random() < marketChance) {
    const marketEvent = { ...marketEvents[Math.floor(Math.random() * marketEvents.length)] };
    events.push({
      id: nanoid(),
      week,
      resolved: false,
      ...marketEvent
    } as GameEvent);
  }
  
  // Landlord resistance
  if (Math.random() < landlordChance) {
    const resistance = landlordResistanceEvents[Math.floor(Math.random() * landlordResistanceEvents.length)];
    events.push({
      id: nanoid(),
      type: EventType.LANDLORD,
      title: resistance.title,
      description: resistance.description,
      impact: resistance.impact,
      options: resistance.options,
      week,
      resolved: false
    });
  }
  
  // Community event
  if (Math.random() < communityChance) {
    const communityEvent = { ...communityEvents[Math.floor(Math.random() * communityEvents.length)] };
    events.push({
      id: nanoid(),
      week,
      resolved: false,
      ...communityEvent
    } as GameEvent);
  }
  
  return events;
}
