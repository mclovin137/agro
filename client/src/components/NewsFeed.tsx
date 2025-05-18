import { useState, useEffect } from "react";
import { GameEvent, EventType, PlayerRole } from "../game/gameTypes";

interface NewsFeedProps {
  events: GameEvent[];
  playerRole: PlayerRole;
  maxItems?: number;
}

export default function NewsFeed({ events, playerRole, maxItems = 5 }: NewsFeedProps) {
  const [showNewsFeed, setShowNewsFeed] = useState(false);
  const [newEvents, setNewEvents] = useState<GameEvent[]>([]);
  
  // Ordenar eventos pelo ano (mais recentes primeiro)
  const sortedEvents = [...events]
    .sort((a, b) => b.year - a.year)
    .slice(0, maxItems);
  
  // Efeito para detectar novos eventos
  useEffect(() => {
    if (events.length > 0) {
      const latestEvent = events[events.length - 1];
      setNewEvents([latestEvent]);
      
      const timer = setTimeout(() => {
        setNewEvents([]);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [events.length]);
  
  // Obter ícone com base no tipo do evento
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
  
  // Obter cor do evento com base no tipo
  const getEventColor = (type: EventType): string => {
    switch (type) {
      case EventType.TECHNOLOGICAL:
        return "bg-blue-100 border-blue-300";
      case EventType.POLITICAL:
        return "bg-purple-100 border-purple-300";
      case EventType.SOCIAL:
        return "bg-amber-100 border-amber-300";
      case EventType.ECONOMIC:
        return "bg-yellow-100 border-yellow-300";
      case EventType.ENVIRONMENTAL:
        return "bg-green-100 border-green-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Cabeçalho */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 p-3 flex justify-between items-center">
        <h3 className="font-medium text-green-800 flex items-center">
          <span className="text-xl mr-2">📰</span>
          Notícias e História
        </h3>
        <button 
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center transition-colors"
          onClick={() => setShowNewsFeed(!showNewsFeed)}
        >
          {showNewsFeed ? (
            <>
              <span className="mr-1">Fechar</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </>
          ) : (
            <>
              <span className="mr-1">Expandir</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      </div>
      
      {/* Notificação de Novo Evento */}
      {newEvents.length > 0 && (
        <div className="bg-green-100 border-b border-green-200 p-2 text-center animate-fadeIn">
          <p className="text-sm text-green-800 font-medium flex items-center justify-center">
            <span className="inline-block animate-pulse mr-2">🔔</span>
            Novo evento adicionado: {newEvents[0].title}
          </p>
        </div>
      )}
      
      {/* Lista de Eventos */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showNewsFeed ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 py-2 overflow-y-auto max-h-96">
          {sortedEvents.length > 0 ? (
            <div className="space-y-3">
              {sortedEvents.map((event) => (
                <div 
                  key={event.id}
                  className={`p-3 rounded-lg border ${getEventColor(event.type)} transition-all hover:shadow-sm`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mr-3">
                      <span className="text-xl" aria-hidden="true">
                        {getEventIcon(event.type)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{event.title}</h4>
                        <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                          Ano {event.year}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500 italic">
              Nenhum evento registrado ainda.
            </p>
          )}
        </div>
      </div>
      
      {/* Preview sem expandir */}
      <div 
        className={`p-3 border-t border-gray-100 bg-gray-50 transition-all duration-300 ${
          showNewsFeed ? "h-0 opacity-0 p-0 overflow-hidden" : "h-auto opacity-100"
        }`}
      >
        {sortedEvents.length > 0 ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-2">
                <span className="text-lg" aria-hidden="true">
                  {getEventIcon(sortedEvents[0].type)}
                </span>
              </div>
              <p className="text-sm truncate max-w-xs">
                <span className="font-medium">{sortedEvents[0].title}</span>
                <span className="mx-1">•</span>
                <span className="text-gray-500">Ano {sortedEvents[0].year}</span>
              </p>
            </div>
            <div className="text-xs text-gray-500">
              {sortedEvents.length} evento{sortedEvents.length !== 1 ? "s" : ""} no total
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500 italic">
            Nenhum evento registrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}
