import { useState, useEffect } from "react";
import { GameEvent, EventOption, EventType, PlayerRole, ResourceType } from "../game/gameTypes";
import { evaluateEventConsequences } from "../game/gameEvents";
import BackgroundPattern from "./BackgroundPattern";

interface EventPanelProps {
  events: GameEvent[];
  playerRole: PlayerRole;
  dispatch: React.Dispatch<any>;
  onClose: () => void;
}

export default function EventPanel({ events, playerRole, dispatch, onClose }: EventPanelProps) {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [animateOption, setAnimateOption] = useState<string | null>(null);
  
  // Efeito para animar a entrada do modal
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Evento atual
  const currentEvent = events[currentEventIndex];
  
  // Verificar se há eventos disponíveis
  if (!currentEvent) {
    return null;
  }
  
  // Simular hover em opções aleatoriamente para atrair atenção
  useEffect(() => {
    if (!selectedOptionId) {
      const interval = setInterval(() => {
        const options = currentEvent.options;
        if (options.length > 0) {
          const randomOption = options[Math.floor(Math.random() * options.length)];
          setAnimateOption(randomOption.id);
          setTimeout(() => setAnimateOption(null), 1500);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [currentEvent, selectedOptionId]);
  
  // Lidar com seleção de opção
  const handleOptionSelect = (option: EventOption) => {
    // Marcar a opção selecionada para animação
    setSelectedOptionId(option.id);
    
    // Pequeno delay para mostrar a seleção antes de passar para o próximo evento
    setTimeout(() => {
      dispatch({
        type: "RESOLVE_EVENT",
        payload: { eventId: currentEvent.id, optionId: option.id }
      });
      
      // Resetar a seleção
      setSelectedOptionId(null);
      
      // Passar para o próximo evento ou fechar o painel
      if (currentEventIndex < events.length - 1) {
        setCurrentEventIndex(currentEventIndex + 1);
      } else {
        onClose();
      }
    }, 800);
  };
  
  // Obter ícone do evento com base no tipo
  const getEventIcon = (type: EventType): string => {
    switch (type) {
      case EventType.TECHNOLOGICAL:
        return "🔬";
      case EventType.POLITICAL:
        return "🏛️";
      case EventType.SOCIAL:
        return "👥";
      case EventType.ECONOMIC:
        return "💰";
      case EventType.ENVIRONMENTAL:
        return "🌿";
      default:
        return "📋";
    }
  };
  
  // Avaliação das consequências para exibição
  const evaluateConsequencesForDisplay = (option: EventOption) => {
    return evaluateEventConsequences(option.consequences, playerRole);
  };
  
  // Função para retornar apenas a parte da cor
  const getEventColorClass = (type: EventType): string => {
    switch (type) {
      case EventType.TECHNOLOGICAL:
        return "blue";
      case EventType.POLITICAL:
        return "purple";
      case EventType.SOCIAL:
        return "amber";
      case EventType.ECONOMIC:
        return "emerald";
      case EventType.ENVIRONMENTAL:
        return "green";
      default:
        return "gray";
    }
  };

  // Funções de renderização segura de classes baseadas em cores dinâmicas
  const getHeaderBgClass = () => {
    switch (getEventColorClass(currentEvent.type)) {
      case "blue":
        return "bg-gradient-to-r from-blue-700 to-blue-600";
      case "purple":
        return "bg-gradient-to-r from-purple-700 to-purple-600";
      case "amber":
        return "bg-gradient-to-r from-amber-700 to-amber-600";
      case "emerald":
        return "bg-gradient-to-r from-emerald-700 to-emerald-600";
      case "green":
        return "bg-gradient-to-r from-green-700 to-green-600";
      default:
        return "bg-gradient-to-r from-gray-700 to-gray-600";
    }
  };
  
  const getIconBgClass = () => {
    switch (getEventColorClass(currentEvent.type)) {
      case "blue":
        return "bg-blue-800 bg-opacity-50";
      case "purple":
        return "bg-purple-800 bg-opacity-50";
      case "amber":
        return "bg-amber-800 bg-opacity-50";
      case "emerald":
        return "bg-emerald-800 bg-opacity-50";
      case "green":
        return "bg-green-800 bg-opacity-50";
      default:
        return "bg-gray-800 bg-opacity-50";
    }
  };
  
  // Funções para construir classes de opção baseadas no estado
  const getOptionBorderClass = (optionId: string) => {
    const colorClass = getEventColorClass(currentEvent.type);
    
    if (selectedOptionId === optionId) {
      return `border-${colorClass}-500 shadow-md`;
    } else if (animateOption === optionId) {
      return `border-${colorClass}-300 shadow-sm`;
    }
    return "border-gray-200";
  };
  
  const getOptionBgClass = (optionId: string) => {
    const colorClass = getEventColorClass(currentEvent.type);
    
    if (selectedOptionId === optionId) {
      switch (colorClass) {
        case "blue":
          return "bg-blue-50";
        case "purple":
          return "bg-purple-50";
        case "amber":
          return "bg-amber-50";
        case "emerald":
          return "bg-emerald-50";
        case "green":
          return "bg-green-50";
        default:
          return "bg-gray-50";
      }
    }
    return "";
  };
  
  const getOptionCircleClass = (optionId: string) => {
    const colorClass = getEventColorClass(currentEvent.type);
    
    if (selectedOptionId === optionId) {
      switch (colorClass) {
        case "blue":
          return "bg-blue-500 text-white border-blue-500";
        case "purple":
          return "bg-purple-500 text-white border-purple-500";
        case "amber":
          return "bg-amber-500 text-white border-amber-500";
        case "emerald":
          return "bg-emerald-500 text-white border-emerald-500";
        case "green":
          return "bg-green-500 text-white border-green-500";
        default:
          return "bg-gray-500 text-white border-gray-500";
      }
    }
    
    switch (colorClass) {
      case "blue":
        return "border-blue-400 group-hover:bg-blue-100";
      case "purple":
        return "border-purple-400 group-hover:bg-purple-100";
      case "amber":
        return "border-amber-400 group-hover:bg-amber-100";
      case "emerald":
        return "border-emerald-400 group-hover:bg-emerald-100";
      case "green":
        return "border-green-400 group-hover:bg-green-100";
      default:
        return "border-gray-400 group-hover:bg-gray-100";
    }
  };
  
  const getConsequenceClasses = (resourceType: string, isPositive: boolean) => {
    let bgColor, textColor, borderColor;
    
    switch (resourceType) {
      case "economic":
        if (isPositive) {
          bgColor = "bg-yellow-100";
          textColor = "text-yellow-800";
          borderColor = "border-yellow-200";
        } else {
          bgColor = "bg-amber-50";
          textColor = "text-amber-700";
          borderColor = "border-amber-100";
        }
        break;
      case "influence":
        if (isPositive) {
          bgColor = "bg-blue-100";
          textColor = "text-blue-800";
          borderColor = "border-blue-200";
        } else {
          bgColor = "bg-sky-50";
          textColor = "text-sky-700";
          borderColor = "border-sky-100";
        }
        break;
      case "social":
        if (isPositive) {
          bgColor = "bg-purple-100";
          textColor = "text-purple-800";
          borderColor = "border-purple-200";
        } else {
          bgColor = "bg-fuchsia-50";
          textColor = "text-fuchsia-700";
          borderColor = "border-fuchsia-100";
        }
        break;
      case "environmental":
        if (isPositive) {
          bgColor = "bg-green-100";
          textColor = "text-green-800";
          borderColor = "border-green-200";
        } else {
          bgColor = "bg-emerald-50";
          textColor = "text-emerald-700";
          borderColor = "border-emerald-100";
        }
        break;
      default:
        if (isPositive) {
          bgColor = "bg-green-100";
          textColor = "text-green-800";
          borderColor = "border-green-200";
        } else {
          bgColor = "bg-red-50";
          textColor = "text-red-700";
          borderColor = "border-red-100";
        }
    }
    
    return `${bgColor} ${textColor} ${borderColor}`;
  };
  
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <BackgroundPattern className="text-white/5" />
      
      <div 
        className={`bg-white/95 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 transition-all duration-500 ${
          showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Cabeçalho do evento */}
        <div className={`${getHeaderBgClass()} p-5 text-white relative overflow-hidden`}>
          {/* Padrão de fundo decorativo */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>

          <div className="flex items-center relative z-10">
            <div className={`h-12 w-12 rounded-full ${getIconBgClass()} flex items-center justify-center mr-4 shadow-lg animate-fadeIn`}>
              <span className="text-2xl" aria-hidden="true">
                {getEventIcon(currentEvent.type)}
              </span>
            </div>
            <div className="animate-fadeIn">
              <h3 className="text-xl font-bold tracking-tight">{currentEvent.title}</h3>
              <p className="text-sm opacity-90 flex items-center mt-1">
                <svg className="w-4 h-4 mr-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ano: {currentEvent.year}
              </p>
            </div>
          </div>
        </div>
        
        {/* Corpo do evento */}
        <div className="p-6">
          {/* Imagem do evento (se disponível e válida) */}
          {currentEvent.imageUrl && currentEvent.imageUrl.startsWith("http") && (
            <div className="mb-5 rounded-lg overflow-hidden shadow-md">
              <img 
                src={currentEvent.imageUrl} 
                alt={currentEvent.title} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // Esconder elemento pai se a imagem falhar ao carregar
                  const target = e.target as HTMLImageElement;
                  if (target.parentElement) {
                    target.parentElement.style.display = 'none';
                  }
                }}
              />
            </div>
          )}
          
          {/* Descrição do evento */}
          <div className="prose prose-lg mb-6 max-w-none text-gray-700 animate-fadeIn">
            <p>{currentEvent.description}</p>
          </div>
          
          {/* Opções do evento */}
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center animate-fadeIn">
            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Escolha sua resposta:
          </h4>
          <div className="space-y-3 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            {currentEvent.options.map((option, index) => (
              <div 
                key={option.id}
                className={`border ${getOptionBorderClass(option.id)} rounded-xl overflow-hidden transition-all hover:shadow-md group ${
                  getOptionBgClass(option.id)
                } ${animateOption === option.id ? 'animate-pulse' : ''}`}
              >
                <button
                  onClick={() => handleOptionSelect(option)}
                  className="w-full text-left p-4"
                  disabled={selectedOptionId !== null}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${getOptionCircleClass(option.id)} flex items-center justify-center mr-3 mt-0.5 transition-colors`}>
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="font-medium text-gray-800 mb-3">{option.text}</p>
                  </div>
                  
                  {/* Consequências */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 pl-9">
                    {evaluateConsequencesForDisplay(option).map((consequence, idx) => {
                      const isPositive = consequence.value > 0;
                      const resourceType = consequence.resourceType;
                      
                      return (
                        <div 
                          key={idx}
                          className={`px-3 py-2 rounded-lg text-sm flex items-center ${getConsequenceClasses(resourceType, isPositive)} border`}
                        >
                          <span className="font-bold mr-2">
                            {isPositive ? "+" : ""}
                            {consequence.value}
                          </span>
                          <span className="text-xs">{consequence.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Rodapé do evento */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Evento {currentEventIndex + 1} de {events.length}
          </div>
          
          {/* Botões de navegação */}
          <div className="flex space-x-2">
            {currentEventIndex > 0 && (
              <button 
                className="px-3 py-1.5 text-gray-600 hover:text-gray-800 transition flex items-center"
                onClick={() => setCurrentEventIndex(currentEventIndex - 1)}
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Evento Anterior
              </button>
            )}
            
            {currentEventIndex < events.length - 1 && (
              <button 
                className="px-3 py-1.5 text-gray-600 hover:text-gray-800 transition flex items-center"
                onClick={() => setCurrentEventIndex(currentEventIndex + 1)}
              >
                Próximo Evento
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}