import { Plot, LandType } from "../game/types";
import { crops } from "../game/crops";

interface FarmPlotProps {
  plot: Plot;
  onClick: () => void;
  isSelected: boolean;
}

export default function FarmPlot({ plot, onClick, isSelected }: FarmPlotProps) {
  // Get plot status color based on type and ownership
  const getPlotColor = () => {
    if (plot.owned) return "bg-green-500 hover:bg-green-600";
    
    switch (plot.type) {
      case LandType.PLAYER:
        return "bg-green-500 hover:bg-green-600";
      case LandType.LANDLORD:
        return "bg-red-500 hover:bg-red-600";
      case LandType.COOPERATIVE:
        return "bg-blue-500 hover:bg-blue-600";
      case LandType.LOCKED:
        return "bg-gray-500";
      default:
        return "bg-gray-300";
    }
  };

  // Get plot interaction state
  const getInteractionState = () => {
    if (plot.type === LandType.LOCKED) {
      return "cursor-not-allowed opacity-80";
    }
    return "cursor-pointer";
  };

  // Get growth stage visual indication
  const getGrowthStageIndicator = () => {
    if (!plot.crop) return null;
    
    const { growthStage, readyToHarvest, cropId } = plot.crop;
    const crop = crops.find(c => c.id === cropId);
    
    if (!crop) return null;
    
    // Different growth stage appearances
    if (readyToHarvest) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-yellow-500 bg-opacity-70 flex items-center justify-center rounded">
            <span className="text-xs font-bold text-white drop-shadow-md">COLHER</span>
          </div>
        </div>
      );
    }
    
    if (growthStage < 25) {
      return (
        <div className="absolute bottom-0 left-0 w-full">
          <div className="h-1 bg-green-300 rounded-full" style={{ width: `${growthStage}%` }}></div>
        </div>
      );
    }
    
    if (growthStage < 50) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-green-400 rounded-full"></div>
        </div>
      );
    }
    
    if (growthStage < 75) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
        </div>
      );
    }
    
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-green-600 rounded-full"></div>
      </div>
    );
  };

  // Get crop icon if plot has a crop
  const getCropIcon = () => {
    if (!plot.crop) return null;
    
    const { cropId } = plot.crop;
    
    // Simple crop icons
    switch (cropId) {
      case "soja":
        return "🌱";
      case "cafe":
        return "☕";
      case "milho":
        return "🌽";
      case "feijao":
        return "🥜";
      case "cacau":
        return "🍫";
      case "algodao":
        return "💮";
      default:
        return "🌿";
    }
  };

  return (
    <div 
      className={`relative w-14 h-14 md:w-16 md:h-16 m-0.5 ${getPlotColor()} ${getInteractionState()} rounded-lg transition-all duration-200 ${isSelected ? 'ring-2 ring-yellow-400' : ''} shadow-sm`}
      onClick={onClick}
    >
      {/* Growth stage indicator */}
      {getGrowthStageIndicator()}
      
      {/* Crop icon */}
      {plot.crop && !plot.crop.readyToHarvest && (
        <div className="absolute inset-0 flex items-center justify-center text-lg">
          {getCropIcon()}
        </div>
      )}
      
      {/* Plot coordinates - minimals and cleaner */}
      <div className="absolute bottom-0 right-0 text-[6px] text-white bg-black bg-opacity-20 px-0.5 rounded-tl">
        {plot.x},{plot.y}
      </div>
    </div>
  );
}
