import { Season, Weather } from "../game/constants";
import { getWeatherIcon } from "../game/utils";

interface WeatherDisplayProps {
  season: Season;
  weather: Weather;
}

export default function WeatherDisplay({ season, weather }: WeatherDisplayProps) {
  // Get background color based on season
  const getSeasonBackground = () => {
    switch (season) {
      case Season.SPRING:
        return "from-green-600 to-green-500";
      case Season.SUMMER:
        return "from-yellow-600 to-yellow-500";
      case Season.FALL:
        return "from-orange-600 to-orange-500";
      case Season.WINTER:
        return "from-blue-600 to-blue-500";
      default:
        return "from-green-600 to-green-500";
    }
  };

  // Get weather description
  const getWeatherDescription = () => {
    switch (weather) {
      case Weather.SUNNY:
        return "O tempo está ensolarado, ideal para o crescimento da maioria das culturas.";
      case Weather.RAINY:
        return "Chuvas benéficas para a maioria das plantações, mas fique atento a alagamentos.";
      case Weather.CLOUDY:
        return "Tempo nublado, o crescimento das culturas pode ser um pouco mais lento.";
      case Weather.STORMY:
        return "Tempestades podem danificar as plantações. Tome cuidado!";
      case Weather.DROUGHT:
        return "Período de seca. As plantações precisarão de irrigação adicional.";
      default:
        return "";
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getSeasonBackground()} text-white py-2 px-4 lg:px-8 shadow-md`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="mr-4 text-2xl">{getWeatherIcon(weather)}</div>
          <div>
            <div className="flex items-center">
              <span className="font-medium">{season}</span>
              <span className="mx-2">•</span>
              <span>{weather}</span>
            </div>
            <p className="text-xs text-white text-opacity-90 mt-1 max-w-md hidden md:block">
              {getWeatherDescription()}
            </p>
          </div>
        </div>
        
        <div className="text-sm hidden lg:block">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-300 mr-1"></span>
            <span className="mr-4">Ótimo para plantio</span>
            
            <span className="w-3 h-3 rounded-full bg-yellow-300 mr-1"></span>
            <span className="mr-4">Crescimento moderado</span>
            
            <span className="w-3 h-3 rounded-full bg-red-300 mr-1"></span>
            <span>Condições adversas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
