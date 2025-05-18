import { crops, formatCurrency } from "../game/crops";
import { useGame } from "../game/store";

export default function MarketPanel() {
  const { state } = useGame();
  
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Preços de Mercado</h3>
      
      <div className="space-y-3">
        {crops.map((crop) => {
          // Check if there are any market conditions affecting this crop
          const marketCondition = state.marketConditions.find(
            condition => condition.cropId === crop.id
          );
          
          // Calculate current price with market condition
          const currentPrice = marketCondition 
            ? crop.basePrice * marketCondition.priceModifier 
            : crop.basePrice;
          
          // Determine price trend
          const isPriceUp = marketCondition?.priceModifier 
            ? marketCondition.priceModifier > 1 
            : false;
          const isPriceDown = marketCondition?.priceModifier 
            ? marketCondition.priceModifier < 1 
            : false;
            
          return (
            <div 
              key={crop.id}
              className="rounded-lg border border-gray-200 p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden mr-2">
                    <img 
                      src={crop.imageUrl}
                      alt={crop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{crop.name}</span>
                </div>
                
                <div className="flex items-center">
                  <span className={`font-bold ${
                    isPriceUp ? 'text-green-600' : 
                    isPriceDown ? 'text-red-600' : 
                    'text-gray-800'
                  }`}>
                    {formatCurrency(currentPrice)}
                  </span>
                  
                  {isPriceUp && (
                    <span className="ml-1 text-green-600">↑</span>
                  )}
                  
                  {isPriceDown && (
                    <span className="ml-1 text-red-600">↓</span>
                  )}
                </div>
              </div>
              
              {marketCondition && (
                <div className="mt-1 text-xs text-gray-500">
                  {marketCondition.reason || (
                    isPriceUp 
                      ? "Preços em alta devido à demanda" 
                      : "Preços em baixa devido ao excesso de oferta"
                  )}
                </div>
              )}
              
              <div className="mt-2 grid grid-cols-2 gap-x-2 text-xs text-gray-600">
                <div>Rendimento: {crop.yield} sacas/ha</div>
                <div>Tempo: {crop.growthTime} dias</div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="text-xs font-medium text-blue-800 mb-1">Dica de mercado</h4>
        <p className="text-xs text-blue-700">
          Monitore as flutuações de preço e plante culturas valorizadas. Eventos podem afetar temporariamente os preços.
        </p>
      </div>
    </div>
  );
}
