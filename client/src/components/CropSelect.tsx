import { crops, getPlantingCost, canPlantInSeason, formatCurrency } from "../game/crops";
import { Season } from "../game/constants";

interface CropSelectProps {
  onSelect: (cropId: string) => void;
  onClose: () => void;
  currentSeason: Season;
  availableMoney: number;
}

export default function CropSelect({ 
  onSelect, 
  onClose, 
  currentSeason,
  availableMoney 
}: CropSelectProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-green-800">Escolha uma cultura para plantar</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center bg-blue-50 p-3 rounded-lg mb-4">
              <span className="text-blue-600 mr-2">ℹ️</span>
              <p className="text-sm text-blue-800">
                Escolha a cultura mais adequada para a estação atual: <strong>{currentSeason}</strong>
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {crops.map((crop) => {
                const canPlant = canPlantInSeason(crop.id, currentSeason);
                const plantingCost = getPlantingCost(crop.id);
                const canAfford = availableMoney >= plantingCost;
                
                return (
                  <div 
                    key={crop.id}
                    className={`border rounded-lg p-4 ${
                      !canPlant || !canAfford
                        ? 'opacity-60 bg-gray-100'
                        : 'hover:border-green-500 hover:shadow-md cursor-pointer'
                    }`}
                    onClick={() => {
                      if (canPlant && canAfford) {
                        onSelect(crop.id);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-4">
                        <img 
                          src={crop.imageUrl}
                          alt={crop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{crop.name}</h3>
                        
                        <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
                          <div className="text-xs text-gray-600">
                            Preço: <span className="font-medium">{formatCurrency(crop.basePrice)}/saca</span>
                          </div>
                          <div className="text-xs text-gray-600">
                            Rendimento: <span className="font-medium">{crop.yield} sacas/ha</span>
                          </div>
                          <div className="text-xs text-gray-600">
                            Tempo: <span className="font-medium">{crop.growthTime} dias</span>
                          </div>
                          <div className="text-xs text-gray-600">
                            Estações: <span className="font-medium">{crop.seasons.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          canAfford 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {formatCurrency(plantingCost)}
                        </div>
                        
                        {!canPlant && (
                          <div className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            Fora de época
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
