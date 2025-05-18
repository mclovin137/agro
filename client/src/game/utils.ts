import { 
  Season, 
  Weather, 
  WEEKS_PER_SEASON,
  MARKET_FLUCTUATION_MIN,
  MARKET_FLUCTUATION_MAX
} from './constants';
import { PlantedCrop, Crop } from './types';
import { crops, daysToWeeks } from './crops';

// Calculate the current season based on week
export function getCurrentSeason(week: number): Season {
  const weekInYear = ((week - 1) % (WEEKS_PER_SEASON * 4)) + 1;
  
  if (weekInYear <= WEEKS_PER_SEASON) {
    return Season.SPRING;
  } else if (weekInYear <= WEEKS_PER_SEASON * 2) {
    return Season.SUMMER;
  } else if (weekInYear <= WEEKS_PER_SEASON * 3) {
    return Season.FALL;
  } else {
    return Season.WINTER;
  }
}

// Get a random weather condition based on season
export function generateWeatherCondition(season: Season): Weather {
  // Probability distribution based on season
  let weatherProbs: [Weather, number][];
  
  switch (season) {
    case Season.SPRING:
      weatherProbs = [
        [Weather.SUNNY, 0.5],
        [Weather.RAINY, 0.3],
        [Weather.CLOUDY, 0.15],
        [Weather.STORMY, 0.05],
        [Weather.DROUGHT, 0]
      ];
      break;
    case Season.SUMMER:
      weatherProbs = [
        [Weather.SUNNY, 0.6],
        [Weather.RAINY, 0.15],
        [Weather.CLOUDY, 0.05],
        [Weather.STORMY, 0.1],
        [Weather.DROUGHT, 0.1]
      ];
      break;
    case Season.FALL:
      weatherProbs = [
        [Weather.SUNNY, 0.3],
        [Weather.RAINY, 0.4],
        [Weather.CLOUDY, 0.2],
        [Weather.STORMY, 0.1],
        [Weather.DROUGHT, 0]
      ];
      break;
    case Season.WINTER:
      weatherProbs = [
        [Weather.SUNNY, 0.2],
        [Weather.RAINY, 0.3],
        [Weather.CLOUDY, 0.4],
        [Weather.STORMY, 0.1],
        [Weather.DROUGHT, 0]
      ];
      break;
  }
  
  // Generate random number
  const random = Math.random();
  let cumulativeProbability = 0;
  
  // Select weather based on probability
  for (const [weather, probability] of weatherProbs) {
    cumulativeProbability += probability;
    if (random <= cumulativeProbability) {
      return weather;
    }
  }
  
  // Default to sunny if we get here
  return Weather.SUNNY;
}

// Calculate crop growth based on weeks passed, season, and weather
export function calculateCropGrowth(
  plantedCrop: PlantedCrop, 
  cropDetails: Crop, 
  currentSeason: Season,
  weather: Weather
): PlantedCrop {
  // Convert growth time from days to weeks
  const growthTimeWeeks = daysToWeeks(cropDetails.growthTime);
  
  // Calculate weeks since planting
  const weeksSincePlanting = plantedCrop.plantedWeek;
  
  // Check if crop can grow in current season
  const canGrowInSeason = cropDetails.seasons.includes(currentSeason);
  
  // Get weather growth modifier
  const weatherModifier = getWeatherGrowthModifier(weather, cropDetails.id);
  
  // Calculate base growth per week as percentage (adjusted for season and weather)
  const baseGrowthPerWeek = 100 / growthTimeWeeks;
  const adjustedGrowthThisWeek = baseGrowthPerWeek * (canGrowInSeason ? 1 : 0.25) * weatherModifier;
  
  // Calculate new growth stage
  let newGrowthStage = plantedCrop.growthStage + adjustedGrowthThisWeek;
  newGrowthStage = Math.min(newGrowthStage, 100); // Cap at 100%
  
  // Determine if ready to harvest
  const readyToHarvest = newGrowthStage >= 100;
  
  return {
    ...plantedCrop,
    growthStage: newGrowthStage,
    readyToHarvest
  };
}

// Get weather modifier for crop growth
function getWeatherGrowthModifier(weather: Weather, cropId: string): number {
  switch (weather) {
    case Weather.SUNNY:
      return 1.0;
    case Weather.RAINY:
      // Rain is good for most crops
      return cropId === 'algodao' ? 0.8 : 1.2;
    case Weather.CLOUDY:
      return 0.9;
    case Weather.STORMY:
      // Storms damage crops
      return 0.5;
    case Weather.DROUGHT:
      // Drought severely impacts growth
      return 0.3;
    default:
      return 1.0;
  }
}

// Get a random market price fluctuation
export function getMarketPriceFluctuation(): number {
  return MARKET_FLUCTUATION_MIN + Math.random() * (MARKET_FLUCTUATION_MAX - MARKET_FLUCTUATION_MIN);
}

// Get weather icon based on condition
export function getWeatherIcon(weather: Weather): string {
  switch (weather) {
    case Weather.SUNNY:
      return "☀️";
    case Weather.RAINY:
      return "🌧️";
    case Weather.CLOUDY:
      return "☁️";
    case Weather.STORMY:
      return "⛈️";
    case Weather.DROUGHT:
      return "🏜️";
    default:
      return "🌤️";
  }
}

// Function to check if player can unlock more land
export function canUnlockMoreLand(influence: number, reputation: number, ownedPlotsCount: number): boolean {
  // Basic logic: higher numbers of plots require more influence and reputation
  const influenceNeeded = 10 * (ownedPlotsCount - 1);
  const reputationNeeded = 5 * (ownedPlotsCount - 1);
  
  return influence >= influenceNeeded && reputation >= reputationNeeded;
}
