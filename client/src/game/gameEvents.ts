// Sistema de eventos para o jogo "Agronegócio e Poder – O Jogo da Hegemonia"
import { nanoid } from 'nanoid';
import { 
  GameEvent, 
  EventType, 
  PlayerRole, 
  ResourceType,
  EventOption,
  EventConsequence
} from './gameTypes';

// Eventos históricos relacionados ao agronegócio no Brasil
export const historicalEvents: GameEvent[] = [
  {
    id: nanoid(),
    type: EventType.TECHNOLOGICAL,
    title: "Início da Revolução Verde",
    description: "O Brasil inicia sua adesão ao modelo da Revolução Verde, com foco em mecanização, uso de insumos químicos e monoculturas. Como você responderá a esta transformação na agricultura?",
    year: 1960,
    options: [
      {
        id: nanoid(),
        text: "Adotar amplamente as novas tecnologias, buscando aumentar a produtividade",
        consequences: [
          {
            resourceType: ResourceType.ECONOMIC,
            value: 200,
            description: "Aumento da produtividade agrícola"
          },
          {
            resourceType: ResourceType.ENVIRONMENTAL,
            value: -150,
            description: "Impacto ambiental do uso intensivo de agroquímicos"
          }
        ]
      },
      {
        id: nanoid(),
        text: "Adotar seletivamente, mantendo algumas práticas tradicionais",
        consequences: [
          {
            resourceType: ResourceType.ECONOMIC,
            value: 100,
            description: "Aumento moderado da produtividade"
          },
          {
            resourceType: ResourceType.ENVIRONMENTAL,
            value: -50,
            description: "Impacto ambiental reduzido"
          },
          {
            resourceType: ResourceType.SOCIAL,
            value: 50,
            description: "Maior aceitação entre agricultores tradicionais"
          }
        ]
      },
      {
        id: nanoid(),
        text: "Resistir e defender modelos alternativos de agricultura",
        consequences: [
          {
            resourceType: ResourceType.ECONOMIC,
            value: -50,
            description: "Menor produtividade inicial"
          },
          {
            resourceType: ResourceType.ENVIRONMENTAL,
            value: 100,
            description: "Preservação de práticas sustentáveis"
          },
          {
            resourceType: ResourceType.SOCIAL,
            value: 150,
            description: "Apoio de comunidades tradicionais"
          }
        ]
      }
    ],
    resolved: false,
    imageUrl: "/images/events/revolucao_verde.jpg"
  },
  {
    id: nanoid(),
    type: EventType.POLITICAL,
    title: "Criação da EMBRAPA",
    description: "O governo brasileiro cria a Empresa Brasileira de Pesquisa Agropecuária (EMBRAPA) para desenvolver tecnologias para a agricultura. Qual será sua posição sobre esta nova instituição?",
    year: 1973,
    options: [
      {
        id: nanoid(),
        text: "Apoiar fortemente e buscar parcerias para grandes produtores",
        consequences: [
          {
            resourceType: ResourceType.ECONOMIC,
            value: 150,
            description: "Acesso preferencial a novas tecnologias"
          },
          {
            resourceType: ResourceType.INFLUENCE,
            value: 100,
            description: "Maior influência sobre pesquisas agrícolas"
          }
        ]
      },
      {
        id: nanoid(),
        text: "Defender que a EMBRAPA atenda também pequenos agricultores",
        consequences: [
          {
            resourceType: ResourceType.INFLUENCE,
            value: 50,
            description: "Reconhecimento político pela posição equilibrada"
          },
          {
            resourceType: ResourceType.SOCIAL,
            value: 100,
            description: "Apoio de diversos setores da sociedade"
          }
        ]
      },
      {
        id: nanoid(),
        text: "Pressionar por um foco em agricultura sustentável e familiar",
        consequences: [
          {
            resourceType: ResourceType.SOCIAL,
            value: 150,
            description: "Forte apoio dos movimentos sociais rurais"
          },
          {
            resourceType: ResourceType.ENVIRONMENTAL,
            value: 100,
            description: "Avanços em práticas agrícolas sustentáveis"
          },
          {
            resourceType: ResourceType.INFLUENCE,
            value: -50,
            description: "Resistência de setores mais tradicionais"
          }
        ]
      }
    ],
    resolved: false,
    imageUrl: "/images/events/embrapa.jpg"
  },
  {
    id: nanoid(),
    type: EventType.SOCIAL,
    title: "Surgimento do MST",
    description: "O Movimento dos Trabalhadores Rurais Sem Terra (MST) surge como uma força organizada pela reforma agrária. Como você reagirá a este novo ator político?",
    year: 1984,
    options: [
      {
        id: nanoid(),
        text: "Opor-se firmemente e mobilizar forças contra ocupações de terra",
        consequences: [
          {
            resourceType: ResourceType.INFLUENCE,
            value: 100,
            description: "Apoio do setor agropecuário tradicional"
          },
          {
            resourceType: ResourceType.SOCIAL,
            value: -200,
            description: "Forte oposição dos movimentos sociais"
          }
        ]
      },
      {
        id: nanoid(),
        text: "Buscar diálogo limitado mantendo foco na defesa da propriedade",
        consequences: [
          {
            resourceType: ResourceType.INFLUENCE,
            value: 50,
            description: "Imagem de moderação política"
          },
          {
            resourceType: ResourceType.SOCIAL,
            value: -50,
            description: "Desconfiança dos movimentos sociais"
          }
        ]
      },
      {
        id: nanoid(),
        text: "Apoiar a causa da reforma agrária e colaborar com o movimento",
        consequences: [
          {
            resourceType: ResourceType.SOCIAL,
            value: 200,
            description: "Forte apoio popular e dos movimentos sociais"
          },
          {
            resourceType: ResourceType.INFLUENCE,
            value: -100,
            description: "Oposição dos grandes proprietários de terra"
          }
        ]
      }
    ],
    resolved: false,
    imageUrl: "/images/events/mst.jpg"
  },
  {
    id: nanoid(),
    type: EventType.ECONOMIC,
    title: "Boom das Commodities",
    description: "A demanda global por commodities agrícolas dispara, impulsionada pelo crescimento da China. Como você posicionará o setor agrícola brasileiro?",
    year: 2000,
    options: [
      {
        id: nanoid(),
        text: "Maximizar produção de commodities para exportação",
        consequences: [
          {
            resourceType: ResourceType.ECONOMIC,
            value: 300,
            description: "Grandes lucros com exportações"
          },
          {
            resourceType: ResourceType.ENVIRONMENTAL,
            value: -200,
            description: "Expansão de monoculturas e desmatamento"
          }
        ]
      },
      {
        id: nanoid(),
        text: "Equilibrar produção para mercado interno e exportação",
        consequences: [
          {
            resourceType: ResourceType.ECONOMIC,
            value: 150,
            description: "Crescimento econômico equilibrado"
          },
          {
            resourceType: ResourceType.SOCIAL,
            value: 100,
            description: "Maior segurança alimentar interna"
          },
          {
            resourceType: ResourceType.ENVIRONMENTAL,
            value: -100,
            description: "Impacto ambiental moderado"
          }
        ]
      },
      {
        id: nanoid(),
        text: "Focar em produtos de valor agregado e nichos sustentáveis",
        consequences: [
          {
            resourceType: ResourceType.ECONOMIC,
            value: 100,
            description: "Rendimentos por área mais altos, mas volume menor"
          },
          {
            resourceType: ResourceType.ENVIRONMENTAL,
            value: 100,
            description: "Práticas mais sustentáveis"
          },
          {
            resourceType: ResourceType.SOCIAL,
            value: 150,
            description: "Reconhecimento social por práticas responsáveis"
          }
        ]
      }
    ],
    resolved: false,
    imageUrl: "/images/events/commodities.jpg"
  },
  {
    id: nanoid(),
    type: EventType.ENVIRONMENTAL,
    title: "Código Florestal Brasileiro",
    description: "O Código Florestal está sendo revisado com debates intensos sobre preservação ambiental e produção agrícola. Qual será sua posição?",
    year: 2012,
    options: [
      {
        id: nanoid(),
        text: "Defender flexibilização para expandir áreas produtivas",
        consequences: [
          {
            resourceType: ResourceType.ECONOMIC,
            value: 200,
            description: "Mais terras disponíveis para cultivo"
          },
          {
            resourceType: ResourceType.ENVIRONMENTAL,
            value: -250,
            description: "Redução significativa de áreas protegidas"
          },
          {
            resourceType: ResourceType.INFLUENCE,
            value: 150,
            description: "Apoio da bancada ruralista"
          }
        ]
      },
      {
        id: nanoid(),
        text: "Propor um meio-termo com compensações ambientais",
        consequences: [
          {
            resourceType: ResourceType.INFLUENCE,
            value: 100,
            description: "Reconhecimento como mediador razoável"
          },
          {
            resourceType: ResourceType.ECONOMIC,
            value: 50,
            description: "Acesso moderado a novas áreas"
          },
          {
            resourceType: ResourceType.ENVIRONMENTAL,
            value: -50,
            description: "Alguma perda de proteção ambiental"
          }
        ]
      },
      {
        id: nanoid(),
        text: "Defender a manutenção de proteções ambientais rigorosas",
        consequences: [
          {
            resourceType: ResourceType.ENVIRONMENTAL,
            value: 200,
            description: "Manutenção de áreas de preservação"
          },
          {
            resourceType: ResourceType.SOCIAL,
            value: 150,
            description: "Apoio de ambientalistas e movimentos sociais"
          },
          {
            resourceType: ResourceType.ECONOMIC,
            value: -100,
            description: "Limitação de expansão agrícola"
          }
        ]
      }
    ],
    resolved: false,
    imageUrl: "/images/events/codigo_florestal.jpg"
  }
];

// Eventos específicos para cada papel
export const roleSpecificEvents: Record<PlayerRole, GameEvent[]> = {
  [PlayerRole.AGRIBUSINESS]: [
    {
      id: nanoid(),
      type: EventType.TECHNOLOGICAL,
      title: "Automação do Campo",
      description: "Novas tecnologias de automação agrícola estão disponíveis, mas exigem alto investimento. Como sua empresa responderá?",
      year: 2010,
      options: [
        {
          id: nanoid(),
          text: "Investir pesadamente em automação completa",
          consequences: [
            {
              resourceType: ResourceType.ECONOMIC,
              value: -200,
              description: "Alto custo inicial de implementação"
            },
            {
              resourceType: ResourceType.ECONOMIC,
              value: 400,
              description: "Aumento significativo de produtividade a longo prazo"
            },
            {
              resourceType: ResourceType.SOCIAL,
              value: -150,
              description: "Redução de empregos rurais e críticas sociais"
            }
          ]
        },
        {
          id: nanoid(),
          text: "Implementar automação gradualmente em áreas estratégicas",
          consequences: [
            {
              resourceType: ResourceType.ECONOMIC,
              value: -100,
              description: "Investimento moderado"
            },
            {
              resourceType: ResourceType.ECONOMIC,
              value: 200,
              description: "Aumento moderado de produtividade"
            },
            {
              resourceType: ResourceType.SOCIAL,
              value: -50,
              description: "Impacto social controlado"
            }
          ]
        },
        {
          id: nanoid(),
          text: "Focar em treinamento de mão de obra em vez de automação plena",
          consequences: [
            {
              resourceType: ResourceType.ECONOMIC,
              value: 50,
              description: "Melhoria moderada de eficiência"
            },
            {
              resourceType: ResourceType.SOCIAL,
              value: 100,
              description: "Valorização dos trabalhadores rurais"
            },
            {
              resourceType: ResourceType.INFLUENCE,
              value: 50,
              description: "Melhor reputação social corporativa"
            }
          ]
        }
      ],
      resolved: false
    }
  ],
  [PlayerRole.FAMILY_FARMER]: [
    {
      id: nanoid(),
      type: EventType.ECONOMIC,
      title: "Cooperativa de Pequenos Produtores",
      description: "Surge a oportunidade de formar uma cooperativa com outros agricultores familiares da região. Como você procederá?",
      year: 1990,
      options: [
        {
          id: nanoid(),
          text: "Liderar a formação da cooperativa investindo tempo e recursos",
          consequences: [
            {
              resourceType: ResourceType.ECONOMIC,
              value: -50,
              description: "Custo inicial de organização"
            },
            {
              resourceType: ResourceType.ECONOMIC,
              value: 150,
              description: "Melhores preços de venda a longo prazo"
            },
            {
              resourceType: ResourceType.SOCIAL,
              value: 200,
              description: "Fortalecimento da comunidade rural"
            },
            {
              resourceType: ResourceType.INFLUENCE,
              value: 100,
              description: "Maior poder de negociação coletiva"
            }
          ]
        },
        {
          id: nanoid(),
          text: "Participar da cooperativa sem assumir papel de liderança",
          consequences: [
            {
              resourceType: ResourceType.ECONOMIC,
              value: 100,
              description: "Melhores preços sem custo inicial"
            },
            {
              resourceType: ResourceType.SOCIAL,
              value: 50,
              description: "Integração comunitária moderada"
            }
          ]
        },
        {
          id: nanoid(),
          text: "Manter-se independente e focar em venda direta ao consumidor",
          consequences: [
            {
              resourceType: ResourceType.ECONOMIC,
              value: 50,
              description: "Preços premium em menor volume"
            },
            {
              resourceType: ResourceType.SOCIAL,
              value: -50,
              description: "Algum distanciamento da comunidade rural"
            },
            {
              resourceType: ResourceType.INFLUENCE,
              value: -30,
              description: "Menor influência coletiva"
            }
          ]
        }
      ],
      resolved: false
    }
  ],
  [PlayerRole.POLITICIAN]: [
    {
      id: nanoid(),
      type: EventType.POLITICAL,
      title: "Projeto de Lei para Subsídios Agrícolas",
      description: "Você tem a oportunidade de propor um projeto de lei sobre subsídios agrícolas. Como estruturará esta proposta?",
      year: 2005,
      options: [
        {
          id: nanoid(),
          text: "Subsídios majoritariamente direcionados ao agronegócio exportador",
          consequences: [
            {
              resourceType: ResourceType.INFLUENCE,
              value: 200,
              description: "Forte apoio da bancada ruralista"
            },
            {
              resourceType: ResourceType.ECONOMIC,
              value: 150,
              description: "Doações de campanha do agronegócio"
            },
            {
              resourceType: ResourceType.SOCIAL,
              value: -150,
              description: "Críticas dos movimentos sociais"
            }
          ]
        },
        {
          id: nanoid(),
          text: "Subsídios equilibrados entre agronegócio e agricultura familiar",
          consequences: [
            {
              resourceType: ResourceType.INFLUENCE,
              value: 100,
              description: "Apoio moderado de diferentes setores"
            },
            {
              resourceType: ResourceType.SOCIAL,
              value: 50,
              description: "Reconhecimento como político equilibrado"
            },
            {
              resourceType: ResourceType.ECONOMIC,
              value: 50,
              description: "Apoio financeiro moderado de diversos setores"
            }
          ]
        },
        {
          id: nanoid(),
          text: "Priorizar subsídios para agricultura familiar e agroecologia",
          consequences: [
            {
              resourceType: ResourceType.SOCIAL,
              value: 200,
              description: "Forte apoio de movimentos sociais e ambientalistas"
            },
            {
              resourceType: ResourceType.INFLUENCE,
              value: -100,
              description: "Oposição da bancada ruralista"
            },
            {
              resourceType: ResourceType.ENVIRONMENTAL,
              value: 150,
              description: "Incentivo a práticas sustentáveis"
            }
          ]
        }
      ],
      resolved: false
    }
  ],
  [PlayerRole.ACTIVIST]: [
    {
      id: nanoid(),
      type: EventType.SOCIAL,
      title: "Ocupação de Latifúndio Improdutivo",
      description: "Seu movimento identificou um grande latifúndio improdutivo. Como organizará a ação?",
      year: 1995,
      options: [
        {
          id: nanoid(),
          text: "Organizar ocupação massiva com ampla cobertura de mídia",
          consequences: [
            {
              resourceType: ResourceType.SOCIAL,
              value: 200,
              description: "Mobilização expressiva da base"
            },
            {
              resourceType: ResourceType.INFLUENCE,
              value: 100,
              description: "Visibilidade nacional para a causa"
            },
            {
              resourceType: ResourceType.ECONOMIC,
              value: -100,
              description: "Custos organizacionais e possíveis processos"
            }
          ]
        },
        {
          id: nanoid(),
          text: "Priorizar negociação com autoridades antes de qualquer ocupação",
          consequences: [
            {
              resourceType: ResourceType.INFLUENCE,
              value: 150,
              description: "Reconhecimento institucional como interlocutor"
            },
            {
              resourceType: ResourceType.SOCIAL,
              value: -50,
              description: "Alguma frustração da base mais radical"
            },
            {
              resourceType: ResourceType.ECONOMIC,
              value: 50,
              description: "Menor custo organizacional"
            }
          ]
        },
        {
          id: nanoid(),
          text: "Montar acampamento simbólico e focar em batalhas judiciais",
          consequences: [
            {
              resourceType: ResourceType.INFLUENCE,
              value: 50,
              description: "Credibilidade no sistema jurídico"
            },
            {
              resourceType: ResourceType.SOCIAL,
              value: 50,
              description: "Apoio moderado da sociedade civil"
            },
            {
              resourceType: ResourceType.ECONOMIC,
              value: -50,
              description: "Custos legais e de mobilização limitada"
            }
          ]
        }
      ],
      resolved: false
    }
  ]
};

// Função para gerar eventos aleatórios baseados no ano atual
export function generateRandomEvents(currentYear: number, playerRole: PlayerRole): GameEvent[] {
  const events: GameEvent[] = [];
  
  // Adicionar eventos históricos relevantes para o ano atual
  const relevantHistoricalEvents = historicalEvents.filter(
    event => event.year <= currentYear && event.year > currentYear - 5 && !event.resolved
  );
  
  events.push(...relevantHistoricalEvents);
  
  // Adicionar eventos específicos para o papel do jogador
  const roleEvents = roleSpecificEvents[playerRole].filter(
    event => event.year <= currentYear && event.year > currentYear - 5 && !event.resolved
  );
  
  events.push(...roleEvents);
  
  // Gerar eventos aleatórios adicionais se necessário
  if (events.length < 2) {
    // Implementação de geração de eventos aleatórios...
    // (Código simplificado para o exemplo)
  }
  
  return events;
}

// Função para avaliar consequências de um evento com base no papel do jogador
export function evaluateEventConsequences(
  consequences: EventConsequence[],
  playerRole: PlayerRole
): EventConsequence[] {
  return consequences.map(consequence => {
    let modifier = 1.0;
    
    // Aplicar modificadores baseados no papel do jogador
    if (playerRole === PlayerRole.AGRIBUSINESS && consequence.resourceType === ResourceType.ECONOMIC) {
      modifier = 1.2; // Agronegócio tem mais impacto em decisões econômicas
    } else if (playerRole === PlayerRole.FAMILY_FARMER && consequence.resourceType === ResourceType.ENVIRONMENTAL) {
      modifier = 1.2; // Agricultores familiares têm mais impacto em decisões ambientais
    } else if (playerRole === PlayerRole.POLITICIAN && consequence.resourceType === ResourceType.INFLUENCE) {
      modifier = 1.3; // Políticos têm mais impacto em decisões de influência
    } else if (playerRole === PlayerRole.ACTIVIST && consequence.resourceType === ResourceType.SOCIAL) {
      modifier = 1.3; // Ativistas têm mais impacto em decisões sociais
    }
    
    // Retornar consequência com valor ajustado
    return {
      ...consequence,
      value: Math.round(consequence.value * modifier)
    };
  });
}