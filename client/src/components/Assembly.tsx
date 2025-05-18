import { GameEvent, EventOption } from "../game/types";

interface AssemblyProps {
  event: GameEvent;
  onOptionSelect: (option: EventOption) => void;
}

export default function Assembly({ event, onOptionSelect }: AssemblyProps) {
  // Background image for assembly
  const assemblyBgImage = "https://images.unsplash.com/photo-1529209076408-5a115ec9f1c6";

  return (
    <div className="space-y-6">
      <div className="h-40 rounded-lg overflow-hidden mb-4">
        <img 
          src={assemblyBgImage} 
          alt="Assembleia Rural" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-700 mb-6">{event.description}</p>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-6">
        <p className="text-sm text-yellow-800">
          Esta é uma oportunidade importante para aumentar sua influência na comunidade 
          e ganhar reputação para futuras aquisições de terra.
        </p>
      </div>
      
      <div className="space-y-4">
        {event.options && event.options.map((option) => {
          // Determine styling based on option type
          const getOptionStyle = () => {
            if (option.text.includes("pacífica")) {
              return "border-blue-500 hover:bg-blue-50";
            } else if (option.text.includes("diretas") || option.text.includes("ocupação")) {
              return "border-red-500 hover:bg-red-50";
            } else if (option.text.includes("cooperativas")) {
              return "border-green-500 hover:bg-green-50";
            } else {
              return "border-purple-500 hover:bg-purple-50";
            }
          };
          
          return (
            <button
              key={option.id}
              onClick={() => onOptionSelect(option)}
              className={`w-full py-3 px-4 border rounded-lg text-left transition-colors ${getOptionStyle()}`}
            >
              <span className="block font-medium text-gray-800">{option.text}</span>
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
          );
        })}
      </div>
    </div>
  );
}
