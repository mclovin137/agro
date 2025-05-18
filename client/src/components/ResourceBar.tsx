import { getCurrentSeason } from "../game/utils";
import { formatCurrency } from "../game/crops";

interface ResourceBarProps {
  money: number;
  influence: number;
  reputation: number;
  week: number;
  year: number;
}

export default function ResourceBar({ 
  money, 
  influence, 
  reputation,
  week,
  year
}: ResourceBarProps) {
  // Get season from week
  const season = getCurrentSeason(week);
  
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Dinheiro</span>
            <span className="font-bold text-green-700">{formatCurrency(money)}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Influência</span>
            <span className="font-bold text-blue-700">{influence}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Reputação</span>
            <span className="font-bold text-purple-700">{reputation}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Data</span>
            <span className="font-medium">Ano {year}, Semana {week}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Estação</span>
            <span className="font-medium">{season}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
