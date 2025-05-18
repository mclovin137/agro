import React, { useState } from 'react';
import { useGame } from '../game/store';
import { MarketRegion, RegionMarket, EconomicTrend } from '../game/economy';
import { crops } from '../game/crops';
import { calculateCropPriceInRegion, findBestMarketForCrop } from '../game/economy';
import { formatCurrency } from '../game/crops';
import { Badge } from './ui/badge';

export default function GlobalMarketPanel() {
  const { state, dispatch } = useGame();
  const { exportDestination, lastHarvestedCrops } = state;
  // Garantir que globalMarket existe
  const globalMarket = state.globalMarket || { regions: [], activeNews: [], historicalPrices: {} };
  const [selectedRegion, setSelectedRegion] = useState<MarketRegion>(exportDestination || MarketRegion.LOCAL);
  
  // Se não houver dados do mercado global, mostrar mensagem
  if (!globalMarket.regions || globalMarket.regions.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">Carregando dados do mercado global...</p>
        <button 
          onClick={() => dispatch({ type: 'ADVANCE_WEEK' })}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Avançar Semana para Atualizar
        </button>
      </div>
    );
  }
  
  // Ordenar as regiões por ordem de importância
  const sortedRegions = [...globalMarket.regions].sort((a, b) => {
    // Local e Nacional sempre primeiro
    if (a.region === MarketRegion.LOCAL) return -1;
    if (b.region === MarketRegion.LOCAL) return 1;
    if (a.region === MarketRegion.NATIONAL) return -1;
    if (b.region === MarketRegion.NATIONAL) return 1;
    return 0;
  });
  
  const getTrendColor = (trend: EconomicTrend): string => {
    switch(trend) {
      case EconomicTrend.BULL: return 'text-green-600';
      case EconomicTrend.BEAR: return 'text-red-600';
      case EconomicTrend.VOLATILE: return 'text-yellow-600';
      default: return 'text-blue-600';
    }
  };

  const getTrendIcon = (trend: EconomicTrend): string => {
    switch(trend) {
      case EconomicTrend.BULL: return '↑'; // Seta para cima
      case EconomicTrend.BEAR: return '↓'; // Seta para baixo
      case EconomicTrend.VOLATILE: return '⇅'; // Seta dupla
      default: return '↔'; // Seta horizontal
    }
  };
  
  const handleSetExportDestination = (region: MarketRegion) => {
    dispatch({
      type: 'SET_EXPORT_DESTINATION',
      payload: region
    });
    setSelectedRegion(region);
  };
  
  const createExportContract = (cropId: string, region: MarketRegion) => {
    const harvestedAmount = lastHarvestedCrops[cropId] || 0;
    if (harvestedAmount <= 0) return;
    
    const price = calculateCropPriceInRegion(cropId, region, globalMarket);
    
    dispatch({
      type: 'CREATE_EXPORT_CONTRACT',
      payload: {
        cropId,
        quantity: harvestedAmount,
        region,
        pricePerUnit: price,
        duration: 4 // Contrato de 4 semanas
      }
    });
  };
  
  const cropWithBestMarket = () => {
    let bestCrop = '';
    let bestRatio = 0;
    
    // Procurar cultura com maior diferença de preço entre mercados
    for (const crop of crops) {
      const localPrice = calculateCropPriceInRegion(crop.id, MarketRegion.LOCAL, globalMarket);
      const { price: bestPrice } = findBestMarketForCrop(crop.id, globalMarket);
      
      const ratio = bestPrice / localPrice;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestCrop = crop.id;
      }
    }
    
    if (!bestCrop) return null;
    
    const crop = crops.find(c => c.id === bestCrop);
    const { region, price } = findBestMarketForCrop(bestCrop, globalMarket);
    
    return { 
      crop, 
      region, 
      price,
      ratio: bestRatio
    };
  };
  
  const bestMarketInfo = cropWithBestMarket();
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Mercado Global</h2>
      
      {bestMarketInfo && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-semibold text-amber-800">Oportunidade de Mercado!</h3>
          <p className="text-sm text-amber-700">
            {bestMarketInfo.crop?.name} está com preço {Math.round((bestMarketInfo.ratio - 1) * 100)}% maior 
            no mercado <span className="font-semibold">{bestMarketInfo.region}</span> ({formatCurrency(bestMarketInfo.price)}).
          </p>
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Destino de exportação atual: <span className="text-blue-700">{exportDestination}</span></h3>
        <div className="flex flex-wrap gap-2">
          {sortedRegions.map(region => (
            <button
              key={region.region}
              onClick={() => handleSetExportDestination(region.region)}
              className={`px-3 py-1 text-sm rounded-full ${region.region === exportDestination 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {region.region}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Notícias de Mercado:</h3>
        {globalMarket.activeNews.length > 0 ? (
          <ul className="space-y-2">
            {globalMarket.activeNews.map(news => (
              <li key={news.id} className="text-sm p-2 bg-gray-50 rounded border border-gray-200">
                <div className="font-medium">{news.headline}</div>
                <div className="text-gray-600">{news.description}</div>
                <div className="mt-1 text-xs">
                  <Badge variant={news.impact.priceImpact > 1 ? "default" : "destructive"}>
                    {news.impact.priceImpact > 1 
                      ? `+${Math.round((news.impact.priceImpact - 1) * 100)}%` 
                      : `${Math.round((news.impact.priceImpact - 1) * 100)}%`}
                  </Badge>
                  {news.impact.cropId && (
                    <Badge variant="outline" className="ml-2">
                      {crops.find(c => c.id === news.impact.cropId)?.name || news.impact.cropId}
                    </Badge>
                  )}
                  {news.impact.region && (
                    <Badge variant="outline" className="ml-2">
                      {news.impact.region}
                    </Badge>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">Nenhuma notícia de mercado no momento.</p>
        )}
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Tendências Regionais:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedRegions.map(region => (
            <RegionCard 
              key={region.region} 
              region={region} 
              globalMarket={globalMarket}
              isSelected={region.region === selectedRegion}
              onSelect={() => setSelectedRegion(region.region)}
              onCreateContract={createExportContract}
              harvestedCrops={lastHarvestedCrops}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface RegionCardProps {
  region: RegionMarket;
  globalMarket: any;
  isSelected: boolean;
  onSelect: () => void;
  onCreateContract: (cropId: string, region: MarketRegion) => void;
  harvestedCrops: { [cropId: string]: number };
}

function RegionCard({ 
  region, 
  globalMarket, 
  isSelected, 
  onSelect,
  onCreateContract,
  harvestedCrops
}: RegionCardProps) {
  const [showCrops, setShowCrops] = useState(false);
  
  const trendColor = region.trend === EconomicTrend.BULL 
    ? 'text-green-600' 
    : region.trend === EconomicTrend.BEAR 
      ? 'text-red-600' 
      : region.trend === EconomicTrend.VOLATILE 
        ? 'text-yellow-600' 
        : 'text-blue-600';
  
  const trendIcon = region.trend === EconomicTrend.BULL 
    ? '↑' 
    : region.trend === EconomicTrend.BEAR 
      ? '↓' 
      : region.trend === EconomicTrend.VOLATILE 
        ? '⇅' 
        : '↔';
        
  return (
    <div 
      className={`border rounded-lg p-3 cursor-pointer transition-colors ${isSelected ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{region.region}</h4>
        <div className={`${trendColor} font-medium flex items-center`}>
          <span className="mr-1">{trendIcon}</span>
          <span>{region.trend}</span>
        </div>
      </div>
      
      <div className="mt-2 text-sm">
        <div className="flex justify-between">
          <span>Demanda:</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.ceil(region.demandLevel / 2) ? 'text-blue-500' : 'text-gray-300'}>●</span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between mt-1">
          <span>Custo de transporte:</span>
          <span>{Math.round(region.transportCost * 100)}%</span>
        </div>
      </div>
      
      <button 
        className="w-full mt-2 text-sm py-1 px-2 bg-gray-100 hover:bg-gray-200 rounded text-center"
        onClick={(e) => { e.stopPropagation(); setShowCrops(!showCrops); }}
      >
        {showCrops ? 'Esconder preços' : 'Ver preços de culturas'}
      </button>
      
      {showCrops && (
        <div className="mt-2 space-y-2">
          {crops.map(crop => {
            const price = calculateCropPriceInRegion(crop.id, region.region, globalMarket);
            const hasHarvested = (harvestedCrops[crop.id] || 0) > 0;
            
            return (
              <div key={crop.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <img 
                    src={crop.imageUrl} 
                    alt={crop.name} 
                    className="w-5 h-5 mr-1 object-contain" 
                  />
                  <span>{crop.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{formatCurrency(price)}</span>
                  {hasHarvested && region.region !== MarketRegion.LOCAL && (
                    <button 
                      className="text-xs bg-green-100 hover:bg-green-200 text-green-800 py-0.5 px-1.5 rounded"
                      onClick={(e) => { e.stopPropagation(); onCreateContract(crop.id, region.region); }}
                    >
                      Vender
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
