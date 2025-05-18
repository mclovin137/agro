import { ResourceType } from "../game/gameTypes";

interface ResourceDisplayProps {
  resources: Record<ResourceType, number>;
}

export default function ResourceDisplay({ resources }: ResourceDisplayProps) {
  // Função para renderizar o ícone de cada recurso
  const getResourceIcon = (type: ResourceType): string => {
    switch (type) {
      case ResourceType.ECONOMIC:
        return "💰";
      case ResourceType.INFLUENCE:
        return "🏛️";
      case ResourceType.SOCIAL:
        return "👥";
      case ResourceType.ENVIRONMENTAL:
        return "🌱";
      default:
        return "❓";
    }
  };

  // Função para obter a cor de cada recurso
  const getResourceColor = (type: ResourceType): string => {
    switch (type) {
      case ResourceType.ECONOMIC:
        return "bg-yellow-100 border-yellow-500 text-yellow-800";
      case ResourceType.INFLUENCE:
        return "bg-blue-100 border-blue-500 text-blue-800";
      case ResourceType.SOCIAL:
        return "bg-purple-100 border-purple-500 text-purple-800";
      case ResourceType.ENVIRONMENTAL:
        return "bg-green-100 border-green-500 text-green-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
    }
  };

  // Função para obter o nome legível de cada recurso
  const getResourceName = (type: ResourceType): string => {
    switch (type) {
      case ResourceType.ECONOMIC:
        return "Econômico";
      case ResourceType.INFLUENCE:
        return "Influência";
      case ResourceType.SOCIAL:
        return "Social";
      case ResourceType.ENVIRONMENTAL:
        return "Ambiental";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(resources).map(([type, value]) => {
            const resourceType = type as ResourceType;
            // Determinando o valor relativo para mostrar o progresso (assumindo valor máximo de 2000)
            const progressPercent = Math.min(100, (value / 2000) * 100);
            
            return (
              <div 
                key={type} 
                className={`border rounded-xl px-4 py-3 ${
                  getResourceColor(resourceType)
                } relative overflow-hidden group hover:shadow-md transition-shadow`}
              >
                {/* Barra de progresso em segundo plano */}
                <div 
                  className="absolute left-0 bottom-0 h-1 opacity-70 transition-all duration-500 ease-out group-hover:h-full"
                  style={{ 
                    width: `${progressPercent}%`, 
                    background: `linear-gradient(90deg, 
                      ${resourceType === ResourceType.ECONOMIC ? 'rgba(251, 191, 36, 0.1)' : 
                      resourceType === ResourceType.INFLUENCE ? 'rgba(59, 130, 246, 0.1)' :
                      resourceType === ResourceType.SOCIAL ? 'rgba(139, 92, 246, 0.1)' :
                      'rgba(16, 185, 129, 0.1)'} 0%, 
                      ${resourceType === ResourceType.ECONOMIC ? 'rgba(251, 191, 36, 0.2)' : 
                      resourceType === ResourceType.INFLUENCE ? 'rgba(59, 130, 246, 0.2)' :
                      resourceType === ResourceType.SOCIAL ? 'rgba(139, 92, 246, 0.2)' :
                      'rgba(16, 185, 129, 0.2)'} 100%)`
                  }}
                ></div>
                
                <div className="flex items-center relative z-10">
                  <div className="p-2 rounded-lg mr-3 bg-white/80 shadow-sm">
                    <span className="text-2xl" aria-hidden="true">
                      {getResourceIcon(resourceType)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80">
                      {getResourceName(resourceType)}
                    </h3>
                    <p className="text-xl font-bold">
                      {value.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}