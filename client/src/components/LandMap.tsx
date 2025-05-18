import { useState } from "react";
import { useGame } from "../game/store";
import { Plot, LandType } from "../game/types";
import FarmPlot from "./FarmPlot";
import CropSelect from "./CropSelect";
import { LAND_ACQUISITION_THRESHOLDS } from "../game/constants";
import { toast } from "sonner";

interface LandMapProps {
  plots: Plot[];
}

export default function LandMap({ plots }: LandMapProps) {
  const { dispatch, state } = useGame();
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [showCropSelect, setShowCropSelect] = useState(false);

  // Handle plot click
  const handlePlotClick = (plot: Plot) => {
    setSelectedPlot(plot);
    
    // If plot is owned but has no crop, show crop select
    if (plot.owned && !plot.crop) {
      setShowCropSelect(true);
    } 
    // If plot has a crop that's ready to harvest
    else if (plot.owned && plot.crop?.readyToHarvest) {
      dispatch({ 
        type: "HARVEST_CROP", 
        payload: { harvestPlotId: plot.id } 
      });
      toast.success("Colheita realizada com sucesso!");
    }
    // If plot is owned by landlord, check if we can acquire it
    else if (plot.type === LandType.LANDLORD && !plot.owned) {
      const ownedPlotsCount = plots.filter(p => p.owned).length;
      const requiredThreshold = LAND_ACQUISITION_THRESHOLDS[
        Math.min(ownedPlotsCount - 2, LAND_ACQUISITION_THRESHOLDS.length - 1)
      ];
      
      if (state.influence < requiredThreshold.influence || 
          state.reputation < requiredThreshold.reputation) {
        toast.error(
          `Você precisa de mais influência (${requiredThreshold.influence}) e reputação (${requiredThreshold.reputation}) para adquirir essa terra.`
        );
      } else {
        // Try to acquire the land
        const acquisitionCost = 500 * ownedPlotsCount;
        if (state.money < acquisitionCost) {
          toast.error(`Você precisa de R$ ${acquisitionCost} para adquirir essa terra.`);
        } else {
          if (window.confirm(`Deseja adquirir esta terra por R$ ${acquisitionCost}?`)) {
            dispatch({ 
              type: "ACQUIRE_LAND", 
              payload: { landPlotId: plot.id } 
            });
            toast.success("Terra adquirida com sucesso!");
          }
        }
      }
    }
  };

  // Handle crop selection
  const handleCropSelect = (cropId: string) => {
    if (!selectedPlot) return;
    
    dispatch({ 
      type: "PLANT_CROP", 
      payload: { plotId: selectedPlot.id, cropId } 
    });
    
    setShowCropSelect(false);
    toast.success("Plantação iniciada!");
  };

  // Close crop select modal
  const closeCropSelect = () => {
    setShowCropSelect(false);
    setSelectedPlot(null);
  };

  // Group plots by row for grid layout
  const gridSize = 6;
  const rows = Array(gridSize).fill(0).map((_, i) => 
    plots.filter(plot => plot.y === i)
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-3 text-xs">
        <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span>Sua terra</span>
        </div>
        <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
          <span>Latifundiário</span>
        </div>
        <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
          <span>Cooperativa</span>
        </div>
        <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm">
          <div className="w-3 h-3 bg-gray-500 rounded-full mr-1"></div>
          <span>Inacessível</span>
        </div>
      </div>

      <div className="border border-green-700 rounded-lg bg-green-100 shadow-inner overflow-hidden">
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex flex-nowrap">
            {row.map((plot) => (
              <FarmPlot
                key={plot.id}
                plot={plot}
                onClick={() => handlePlotClick(plot)}
                isSelected={selectedPlot?.id === plot.id}
              />
            ))}
          </div>
        ))}
      </div>

      {showCropSelect && selectedPlot && (
        <CropSelect 
          onSelect={handleCropSelect}
          onClose={closeCropSelect}
          currentSeason={state.season}
          availableMoney={state.money}
        />
      )}
    </div>
  );
}
