import { nanoid } from 'nanoid';
import { Crop } from './types';
import { crops } from './crops';
import { Season } from './constants';

// Tipos para o sistema econômico
export enum MarketRegion {
  LOCAL = "Local",
  NATIONAL = "Nacional",
  SOUTHAMERICA = "América do Sul",
  NORTHAMERICA = "América do Norte",
  EUROPE = "Europa",
  ASIA = "Ásia",
  AFRICA = "África"
}

export enum EconomicTrend {
  BEAR = "Em queda",       // Mercado em queda
  BULL = "Em alta",        // Mercado em alta
  STABLE = "Estável",      // Mercado estável
  VOLATILE = "Volátil"     // Mercado com grandes oscilações
}

export interface MarketNews {
  id: string;
  headline: string;
  description: string;
  impact: {
    cropId?: string;     // Se afeta uma cultura específica
    region?: MarketRegion; // Se afeta uma região específica
    priceImpact: number; // Multiplicador de preço (ex: 0.8 para queda, 1.2 para aumento)
  };
  duration: number;     // Em semanas
  startWeek: number;    // Semana em que o evento começa
}

export interface RegionMarket {
  region: MarketRegion;
  trend: EconomicTrend;
  cropModifiers: { [cropId: string]: number }; // Modificadores específicos por cultura
  transportCost: number; // Custo adicional para exportar para esta região (em %)
  demandLevel: number;   // 0-10, com 10 sendo alta demanda
}

export interface GlobalMarket {
  regions: RegionMarket[];
  activeNews: MarketNews[];
  historicalPrices: {
    [cropId: string]: { week: number; price: number }[];
  };
}

// Valores base para cada região
const baseRegionMarkets: RegionMarket[] = [
  {
    region: MarketRegion.LOCAL,
    trend: EconomicTrend.STABLE,
    cropModifiers: {},
    transportCost: 0,
    demandLevel: 5
  },
  {
    region: MarketRegion.NATIONAL,
    trend: EconomicTrend.STABLE,
    cropModifiers: {},
    transportCost: 0.05, // 5%
    demandLevel: 6
  },
  {
    region: MarketRegion.SOUTHAMERICA,
    trend: EconomicTrend.STABLE,
    cropModifiers: { 
      "soja": 1.1,
      "cafe": 1.15,
      "milho": 1.05
    },
    transportCost: 0.1, // 10%
    demandLevel: 7
  },
  {
    region: MarketRegion.NORTHAMERICA,
    trend: EconomicTrend.BULL,
    cropModifiers: {
      "soja": 1.2,
      "algodao": 1.25,
      "cacau": 1.3
    },
    transportCost: 0.15, // 15%
    demandLevel: 8
  },
  {
    region: MarketRegion.EUROPE,
    trend: EconomicTrend.STABLE,
    cropModifiers: {
      "cafe": 1.3,
      "cacau": 1.35,
      "mandioca": 1.1
    },
    transportCost: 0.2, // 20%
    demandLevel: 7
  },
  {
    region: MarketRegion.ASIA,
    trend: EconomicTrend.BULL,
    cropModifiers: {
      "soja": 1.25,
      "algodao": 1.2,
      "feijao": 1.1
    },
    transportCost: 0.25, // 25%
    demandLevel: 9
  },
  {
    region: MarketRegion.AFRICA,
    trend: EconomicTrend.VOLATILE,
    cropModifiers: {
      "mandioca": 1.2,
      "feijao": 1.15,
      "milho": 1.1
    },
    transportCost: 0.2, // 20%
    demandLevel: 6
  }
];

// Lista de possíveis notícias econômicas globais
const potentialMarketNews: Partial<MarketNews>[] = [
  {
    headline: "Seca na América do Norte",
    description: "Seca severa afeta produção de grãos nos EUA e Canadá, elevando preços globais.",
    impact: {
      region: MarketRegion.NORTHAMERICA,
      priceImpact: 1.3
    },
    duration: 4
  },
  {
    headline: "Acordo comercial entre Brasil e China",
    description: "Novo acordo facilita exportação de soja e outros grãos para o mercado asiático.",
    impact: {
      cropId: "soja",
      region: MarketRegion.ASIA,
      priceImpact: 1.25
    },
    duration: 8
  },
  {
    headline: "Superprodução de café na Colômbia",
    description: "Colheita recorde de café na Colômbia pressiona preços para baixo no mercado internacional.",
    impact: {
      cropId: "cafe",
      priceImpact: 0.85
    },
    duration: 6
  },
  {
    headline: "Crise econômica na Europa",
    description: "Instabilidade econômica reduz importações europeias de produtos agrícolas.",
    impact: {
      region: MarketRegion.EUROPE,
      priceImpact: 0.9
    },
    duration: 5
  },
  {
    headline: "Aumento de consumo de chocolate",
    description: "Tendência global de aumento no consumo de chocolate eleva demanda por cacau.",
    impact: {
      cropId: "cacau",
      priceImpact: 1.2
    },
    duration: 3
  },
  {
    headline: "Valorização do dólar",
    description: "Dólar forte torna exportações brasileiras mais competitivas no mercado internacional.",
    impact: {
      priceImpact: 1.1
    },
    duration: 4
  },
  {
    headline: "Crise de transporte marítimo",
    description: "Problemas logísticos aumentam custos de transporte internacional e afetam exportações.",
    impact: {
      priceImpact: 0.92
    },
    duration: 3
  },
  {
    headline: "Alta demanda de mandioca na África",
    description: "Aumento do consumo de derivados de mandioca em países africanos eleva preços internacionais.",
    impact: {
      cropId: "mandioca",
      region: MarketRegion.AFRICA,
      priceImpact: 1.18
    },
    duration: 5
  },
  {
    headline: "Quebra de safra na Ásia",
    description: "Condições climáticas adversas reduzem produção agrícola na Ásia, impactando preços globais.",
    impact: {
      region: MarketRegion.ASIA,
      priceImpact: 1.15
    },
    duration: 4
  },
  {
    headline: "Novas tarifas de importação",
    description: "Países implementam novas tarifas sobre produtos agrícolas, reduzindo comércio internacional.",
    impact: {
      priceImpact: 0.88
    },
    duration: 6
  },
  {
    headline: "Inovação em biocombustíveis",
    description: "Avanços tecnológicos aumentam uso de culturas como milho e cana para produção de biocombustíveis.",
    impact: {
      cropId: "milho",
      priceImpact: 1.12
    },
    duration: 7
  },
  {
    headline: "Mudança nos hábitos alimentares",
    description: "Tendência global de alimentação saudável aumenta consumo de feijão e outros vegetais.",
    impact: {
      cropId: "feijao",
      priceImpact: 1.08
    },
    duration: 5
  }
];

// Inicializar o mercado global
export function initializeGlobalMarket(): GlobalMarket {
  const initialHistoricalPrices: { [cropId: string]: { week: number; price: number }[] } = {};
  
  // Inicializar preços históricos para cada cultura
  crops.forEach(crop => {
    initialHistoricalPrices[crop.id] = [
      { week: 1, price: crop.basePrice }
    ];
  });
  
  return {
    regions: [...baseRegionMarkets],
    activeNews: [],
    historicalPrices: initialHistoricalPrices
  };
}

// Gerar notícias de mercado aleatórias
export function generateMarketNews(week: number, count: number = 1): MarketNews[] {
  const news: MarketNews[] = [];
  
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.7) { // 70% de chance de gerar notícia
      const newsIndex = Math.floor(Math.random() * potentialMarketNews.length);
      const newsTemplate = potentialMarketNews[newsIndex];
      
      news.push({
        id: nanoid(),
        headline: newsTemplate.headline || "",
        description: newsTemplate.description || "",
        impact: newsTemplate.impact || { priceImpact: 1.0 },
        duration: newsTemplate.duration || 3,
        startWeek: week
      });
    }
  }
  
  return news;
}

// Atualizar tendências de mercado com base na estação
export function updateMarketTrends(globalMarket: GlobalMarket, season: Season): GlobalMarket {
  const updatedRegions = globalMarket.regions.map(region => {
    // Tendências sazonais por região
    let newTrend = region.trend;
    const roll = Math.random();
    
    switch(season) {
      case Season.SPRING:
        // Primavera tende a ser positiva para mercados
        if (roll < 0.4) newTrend = EconomicTrend.BULL;
        else if (roll < 0.7) newTrend = EconomicTrend.STABLE;
        else if (roll < 0.9) newTrend = EconomicTrend.VOLATILE;
        else newTrend = EconomicTrend.BEAR;
        break;
        
      case Season.SUMMER:
        // Verão tem mais volatilidade
        if (roll < 0.3) newTrend = EconomicTrend.VOLATILE;
        else if (roll < 0.6) newTrend = EconomicTrend.BULL;
        else if (roll < 0.8) newTrend = EconomicTrend.STABLE;
        else newTrend = EconomicTrend.BEAR;
        break;
        
      case Season.FALL:
        // Outono tende a ser mais estável
        if (roll < 0.5) newTrend = EconomicTrend.STABLE;
        else if (roll < 0.7) newTrend = EconomicTrend.BEAR;
        else if (roll < 0.9) newTrend = EconomicTrend.BULL;
        else newTrend = EconomicTrend.VOLATILE;
        break;
        
      case Season.WINTER:
        // Inverno tende a ter preços mais altos por escassez
        if (roll < 0.4) newTrend = EconomicTrend.BEAR;
        else if (roll < 0.7) newTrend = EconomicTrend.STABLE;
        else if (roll < 0.9) newTrend = EconomicTrend.BULL;
        else newTrend = EconomicTrend.VOLATILE;
        break;
    }
    
    // Atualizar demanda também
    let demandAdjustment = 0;
    if (newTrend === EconomicTrend.BULL) demandAdjustment = 1;
    else if (newTrend === EconomicTrend.BEAR) demandAdjustment = -1;
    
    const newDemandLevel = Math.max(1, Math.min(10, region.demandLevel + demandAdjustment));
    
    return {
      ...region,
      trend: newTrend,
      demandLevel: newDemandLevel
    };
  });
  
  return {
    ...globalMarket,
    regions: updatedRegions
  };
}

// Calcular preço atual de uma cultura em uma região específica
export function calculateCropPriceInRegion(
  cropId: string, 
  region: MarketRegion, 
  globalMarket: GlobalMarket
): number {
  const crop = crops.find(c => c.id === cropId);
  if (!crop) return 0;
  
  const regionData = globalMarket.regions.find(r => r.region === region);
  if (!regionData) return crop.basePrice;
  
  // Preço base
  let price = crop.basePrice;
  
  // Aplicar modificador específico da região para esta cultura
  const cropModifier = regionData.cropModifiers[cropId] || 1.0;
  price *= cropModifier;
  
  // Aplicar efeito da tendência de mercado
  switch(regionData.trend) {
    case EconomicTrend.BULL:
      price *= 1.1 + (regionData.demandLevel * 0.01); // Até +20% em alta demanda
      break;
    case EconomicTrend.BEAR:
      price *= 0.9 - ((10 - regionData.demandLevel) * 0.01); // Até -20% em baixa demanda
      break;
    case EconomicTrend.VOLATILE:
      // Flutuação aleatória entre -15% e +15%
      price *= 0.85 + (Math.random() * 0.3);
      break;
  }
  
  // Aplicar efeitos de notícias ativas
  globalMarket.activeNews.forEach(news => {
    if (
      (news.impact.cropId === cropId || !news.impact.cropId) && 
      (news.impact.region === region || !news.impact.region)
    ) {
      price *= news.impact.priceImpact;
    }
  });
  
  // Adicionar custos de transporte para mercados não locais
  if (region !== MarketRegion.LOCAL) {
    price *= (1 - regionData.transportCost);
  }
  
  return Math.round(price * 100) / 100; // Arredondar para 2 casas decimais
}

// Calcular o melhor mercado para vender uma cultura
export function findBestMarketForCrop(
  cropId: string, 
  globalMarket: GlobalMarket
): { region: MarketRegion; price: number } {
  let bestRegion = MarketRegion.LOCAL;
  let bestPrice = calculateCropPriceInRegion(cropId, MarketRegion.LOCAL, globalMarket);
  
  globalMarket.regions.forEach(region => {
    const price = calculateCropPriceInRegion(cropId, region.region, globalMarket);
    if (price > bestPrice) {
      bestPrice = price;
      bestRegion = region.region;
    }
  });
  
  return { region: bestRegion, price: bestPrice };
}

// Atualizar o mercado global para a próxima semana
export function updateGlobalMarket(
  globalMarket: GlobalMarket, 
  week: number, 
  season: Season
): GlobalMarket {
  // Atualizar tendências de mercado se for o início de uma nova estação
  let updatedMarket = globalMarket;
  if (week % 13 === 1) { // A cada nova estação
    updatedMarket = updateMarketTrends(globalMarket, season);
  }
  
  // Remover notícias expiradas
  const currentActiveNews = updatedMarket.activeNews.filter(news => {
    return news.startWeek + news.duration > week;
  });
  
  // Gerar novas notícias (mais chance no início de uma estação)
  const newsCount = week % 13 === 1 ? 2 : 1;
  const newNews = generateMarketNews(week, newsCount);
  
  // Atualizar preços históricos
  const updatedHistoricalPrices = { ...updatedMarket.historicalPrices };
  
  crops.forEach(crop => {
    // Calcular o preço médio em todas as regiões
    let totalPrice = 0;
    updatedMarket.regions.forEach(region => {
      totalPrice += calculateCropPriceInRegion(crop.id, region.region, updatedMarket);
    });
    const averagePrice = totalPrice / updatedMarket.regions.length;
    
    // Adicionar ao histórico
    if (!updatedHistoricalPrices[crop.id]) {
      updatedHistoricalPrices[crop.id] = [];
    }
    
    updatedHistoricalPrices[crop.id].push({
      week,
      price: averagePrice
    });
    
    // Manter apenas as últimas 52 semanas (1 ano)
    if (updatedHistoricalPrices[crop.id].length > 52) {
      updatedHistoricalPrices[crop.id] = updatedHistoricalPrices[crop.id].slice(-52);
    }
  });
  
  return {
    ...updatedMarket,
    activeNews: [...currentActiveNews, ...newNews],
    historicalPrices: updatedHistoricalPrices
  };
}
