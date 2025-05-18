import { Crop } from './types';
import { Season } from './constants';

export const crops: Crop[] = [
  {
    id: "soja",
    name: "Soja",
    basePrice: 129.22,
    yield: 60, // sacas por hectare
    seasons: [Season.SPRING, Season.SUMMER],
    growthTime: 105, // dias
    imageUrl: "./images/crops/soja.jpg"
  },
  {
    id: "cafe",
    name: "Café",
    basePrice: 3107.59,
    yield: 55,
    seasons: [Season.FALL, Season.WINTER],
    growthTime: 150,
    imageUrl: "./images/crops/cafe.jpg"
  },
  {
    id: "milho",
    name: "Milho",
    basePrice: 80.37,
    yield: 80,
    seasons: [Season.SPRING, Season.SUMMER, Season.FALL, Season.WINTER],
    growthTime: 130,
    imageUrl: "./images/crops/milho.jpg"
  },
  {
    id: "feijao",
    name: "Feijão",
    basePrice: 224.14,
    yield: 50,
    seasons: [Season.SPRING, Season.SUMMER],
    growthTime: 90,
    imageUrl: "./images/crops/feijao.jpg"
  },
  {
    id: "cacau",
    name: "Cacau",
    basePrice: 3220,
    yield: 55,
    seasons: [Season.SPRING, Season.SUMMER, Season.FALL, Season.WINTER],
    growthTime: 150,
    imageUrl: "./images/crops/cacau.jpg"
  },
  {
    id: "algodao",
    name: "Algodão",
    basePrice: 494.16,
    yield: 50,
    seasons: [Season.SUMMER],
    growthTime: 130,
    imageUrl: "./images/crops/algodao.jpg"
  },
  {
    id: "mandioca",
    name: "Mandioca",
    basePrice: 320.45,
    yield: 70,
    seasons: [Season.SPRING, Season.FALL],
    growthTime: 300, // ciclo longo, cerca de 10 meses
    imageUrl: "./images/crops/mandioca.jpg"
  }
];

// Helper function to convert days to weeks
export function daysToWeeks(days: number): number {
  return Math.ceil(days / 7);
}

// Helper to get crop growth details
export function getCropGrowthDetails(cropId: string) {
  const crop = crops.find(c => c.id === cropId);
  if (!crop) return null;
  
  return {
    ...crop,
    growthTimeWeeks: daysToWeeks(crop.growthTime)
  };
}

// Calculate planting cost (20% of market value)
export function getPlantingCost(cropId: string): number {
  const crop = crops.find(c => c.id === cropId);
  if (!crop) return 0;
  
  return Math.floor(crop.basePrice * 0.2);
}

// Check if crop can be planted in current season
export function canPlantInSeason(cropId: string, currentSeason: Season): boolean {
  const crop = crops.find(c => c.id === cropId);
  if (!crop) return false;
  
  return crop.seasons.includes(currentSeason);
}

// Calculate potential profit for a crop
export function calculatePotentialProfit(cropId: string): number {
  const crop = crops.find(c => c.id === cropId);
  if (!crop) return 0;
  
  const plantingCost = getPlantingCost(cropId);
  const harvestValue = crop.basePrice * crop.yield;
  
  return harvestValue - plantingCost;
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return `R$ ${amount.toFixed(2).replace('.', ',')}`;
}

// Get crop image by ID
export function getCropImage(cropId: string): string {
  const crop = crops.find(c => c.id === cropId);
  return crop?.imageUrl || '';
}
