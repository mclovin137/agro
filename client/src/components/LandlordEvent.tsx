import { GameEvent, EventOption } from "../game/types";

interface LandlordEventProps {
  event: GameEvent;
  onOptionSelect: (option: EventOption) => void;
  onResolve: () => void;
}

export default function LandlordEvent({ 
  event, 
  onOptionSelect,
  onResolve 
}: LandlordEventProps) {
  // Image for landlord events
  const landlordImgUrl = "https://images.unsplash.com/photo-1643255899241-962e10048d41";
  
  return (
    <div className="space-y-6">
      <div className="h-48 rounded-lg overflow-hidden mb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900 to-transparent opacity-60"></div>
        <img 
          src={landlordImgUrl} 
          alt="Resistência dos Latifundiários" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">
            Resistência dos Latifundiários
          </h3>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-red-800">{event.title}</h3>
      <p className="text-gray-700 mb-6">{event.description}</p>
      
      <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-6">
        <p className="text-sm text-red-800">
          <strong>Impactos imediatos:</strong>
          <ul className="mt-1 list-disc list-inside">
            {event.impact.money !== 0 && event.impact.money !== undefined && (
              <li>
                {event.impact.money > 0 
                  ? `Ganho de R$ ${event.impact.money}` 
                  : `Perda de R$ ${Math.abs(event.impact.money)}`}
              </li>
            )}
            {event.impact.influence !== 0 && event.impact.influence !== undefined && (
              <li>
                {event.impact.influence > 0 
                  ? `Ganho de ${event.impact.influence} de influência` 
                  : `Perda de ${Math.abs(event.impact.influence)} de influência`}
              </li>
            )}
            {event.impact.reputation !== 0 && event.impact.reputation !== undefined && (
              <li>
                {event.impact.reputation > 0 
                  ? `Ganho de ${event.impact.reputation} de reputação` 
                  : `Perda de ${Math.abs(event.impact.reputation)} de reputação`}
              </li>
            )}
            {event.impact.cropGrowth !== 0 && event.impact.cropGrowth !== undefined && (
              <li>
                {event.impact.cropGrowth > 0 
                  ? `Aumento de ${event.impact.cropGrowth}% no crescimento das culturas` 
                  : `Redução de ${Math.abs(event.impact.cropGrowth)}% no crescimento das culturas`}
              </li>
            )}
          </ul>
        </p>
      </div>
      
      <div className="space-y-4">
        {event.options && event.options.length > 0 ? (
          event.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onOptionSelect(option)}
              className="w-full py-3 px-4 border border-red-600 rounded-lg text-left hover:bg-red-50 transition-colors"
            >
              <span className="block font-medium text-red-800">{option.text}</span>
              <span className="block text-sm text-gray-600 mt-1">
                {option.outcomes.money && option.outcomes.money !== 0 && (
                  <span className={`${option.outcomes.money > 0 ? 'text-green-600' : 'text-red-600'} mr-3`}>
                    {option.outcomes.money > 0 ? '+' : ''}{option.outcomes.money} R$
                  </span>
                )}
                {option.outcomes.influence && option.outcomes.influence !== 0 && (
                  <span className={`${option.outcomes.influence > 0 ? 'text-blue-600' : 'text-red-600'} mr-3`}>
                    {option.outcomes.influence > 0 ? '+' : ''}{option.outcomes.influence} Influência
                  </span>
                )}
                {option.outcomes.reputation && option.outcomes.reputation !== 0 && (
                  <span className={`${option.outcomes.reputation > 0 ? 'text-purple-600' : 'text-red-600'}`}>
                    {option.outcomes.reputation > 0 ? '+' : ''}{option.outcomes.reputation} Reputação
                  </span>
                )}
              </span>
            </button>
          ))
        ) : (
          <button
            onClick={onResolve}
            className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Enfrentar as consequências
          </button>
        )}
      </div>
    </div>
  );
}
