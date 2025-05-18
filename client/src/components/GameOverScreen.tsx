import { PlayerRole, ResourceType } from "../game/gameTypes";
import { ROLE_DESCRIPTIONS } from "../game/gameConstants";
import BackgroundPattern from "./BackgroundPattern";
import { useEffect, useState } from "react";

interface GameOverScreenProps {
  victory: boolean;
  playerRole: PlayerRole;
  playerName: string;
  defeatReason?: string;
  resources: Record<ResourceType, number>;
  currentYear: number;
  onReset: () => void;
}

export default function GameOverScreen({
  victory,
  playerRole,
  playerName,
  defeatReason,
  resources,
  currentYear,
  onReset
}: GameOverScreenProps) {
  const roleTitle = ROLE_DESCRIPTIONS[playerRole].title;
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Efeito para animar a entrada da tela
  useEffect(() => {
    // Atraso para mostrar a animação
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Mensagem específica de vitória baseada no papel
  const getVictoryMessage = () => {
    switch (playerRole) {
      case PlayerRole.AGRIBUSINESS:
        return `Como Grande Produtor Rural, você expandiu sua influência e riqueza, consolidando o poder do agronegócio no Brasil. Seus vastos territórios e sua influência política transformaram o campo brasileiro, com enormes monoculturas altamente produtivas dominando a paisagem.`;
      case PlayerRole.FAMILY_FARMER:
        return `Como Agricultor Familiar, você provou que um modelo alternativo de agricultura é possível. Seus métodos sustentáveis e sua produção diversificada inspiraram uma nova geração de agricultores, criando uma rede de agricultura familiar forte e economicamente viável.`;
      case PlayerRole.POLITICIAN:
        return `Como Político/Legislador, você construiu uma base de apoio impressionante e implementou políticas agrícolas que moldaram o futuro do campo brasileiro. Seu legado na política agrária continuará influenciando o setor por muitas décadas.`;
      case PlayerRole.ACTIVIST:
        return `Como Líder Sindical/Ativista, seu movimento conquistou avanços históricos na reforma agrária e nos direitos dos trabalhadores rurais. Sua luta transformou a estrutura fundiária do país e deu voz aos historicamente marginalizados.`;
      default:
        return `Você transformou o panorama agrícola brasileiro, deixando um legado que será lembrado por gerações.`;
    }
  };
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${
      victory 
        ? "bg-gradient-to-b from-green-900 via-green-800 to-green-700" 
        : "bg-gradient-to-b from-red-900 via-red-800 to-red-700"
    }`}>
      {/* Background decorativo */}
      <BackgroundPattern className={victory ? "text-green-300/30" : "text-red-300/30"} />
      
      {/* Partículas comemorativas para vitória */}
      {victory && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 7}s`
              }}
            >
              <span className="text-xl">
                {['🌱', '🌿', '🌾', '🌻', '🌽', '🥕'][Math.floor(Math.random() * 6)]}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div 
        className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-gray-100 transition-all duration-1000 ${
          showAnimation ? 'opacity-100 transform-none' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className={`p-6 text-white relative overflow-hidden ${victory ? "bg-gradient-to-r from-green-700 to-green-600" : "bg-gradient-to-r from-red-700 to-red-600"}`}>
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
          
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2 tracking-tight flex items-center animate-fadeIn">
              <span className={`inline-block mr-3 ${victory ? "animate-pulse" : ""}`}>
                {victory ? "🏆" : "📉"}
              </span>
              {victory ? "Vitória!" : "Derrota"}
            </h1>
            <p className="opacity-90 animate-fadeIn">
              {victory 
                ? `Ano: ${currentYear} - Você construiu sua hegemonia no campo brasileiro` 
                : `Ano: ${currentYear} - Sua jornada no campo brasileiro chegou ao fim`
              }
            </p>
          </div>
        </div>
        
        <div className="p-8">
          <div className="mb-8 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center mb-6">
              <div className="mr-5">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-inner ${
                  victory ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
                }`}>
                  {playerRole === PlayerRole.AGRIBUSINESS ? '🏭' : 
                   playerRole === PlayerRole.FAMILY_FARMER ? '🌱' :
                   playerRole === PlayerRole.POLITICIAN ? '🏛️' :
                   playerRole === PlayerRole.ACTIVIST ? '✊' : '👤'}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-1">{playerName}</h2>
                <p className={`text-sm px-3 py-1 rounded-full inline-block ${
                  playerRole === PlayerRole.AGRIBUSINESS ? 'bg-blue-100 text-blue-800' :
                  playerRole === PlayerRole.FAMILY_FARMER ? 'bg-green-100 text-green-800' :
                  playerRole === PlayerRole.POLITICIAN ? 'bg-purple-100 text-purple-800' :
                  playerRole === PlayerRole.ACTIVIST ? 'bg-amber-100 text-amber-800' :
                  'bg-gray-100 text-gray-800'
                }`}>{roleTitle}</p>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm">
              {victory ? (
                <p>{getVictoryMessage()}</p>
              ) : (
                <p>
                  {defeatReason || "Sua estratégia não foi suficiente para superar os desafios do campo brasileiro. O poder e a hegemonia se consolidaram em outras mãos."}
                </p>
              )}
            </div>
          </div>
          
          {/* Recursos finais */}
          <div className="mb-8 animate-slideInUp" style={{ animationDelay: '0.6s' }}>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Recursos Finais
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200 transition-all hover:shadow-md">
                <h4 className="text-xs text-yellow-800 font-semibold uppercase tracking-wider mb-1">Econômico</h4>
                <p className="text-2xl font-bold text-yellow-700">{resources[ResourceType.ECONOMIC].toLocaleString()}</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 transition-all hover:shadow-md">
                <h4 className="text-xs text-blue-800 font-semibold uppercase tracking-wider mb-1">Influência</h4>
                <p className="text-2xl font-bold text-blue-700">{resources[ResourceType.INFLUENCE].toLocaleString()}</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 transition-all hover:shadow-md">
                <h4 className="text-xs text-purple-800 font-semibold uppercase tracking-wider mb-1">Social</h4>
                <p className="text-2xl font-bold text-purple-700">{resources[ResourceType.SOCIAL].toLocaleString()}</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 transition-all hover:shadow-md">
                <h4 className="text-xs text-green-800 font-semibold uppercase tracking-wider mb-1">Ambiental</h4>
                <p className="text-2xl font-bold text-green-700">{resources[ResourceType.ENVIRONMENTAL].toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          {/* Botão de reiniciar */}
          <div className="flex justify-center animate-slideInUp" style={{ animationDelay: '0.9s' }}>
            <button 
              onClick={onReset}
              className={`px-8 py-3.5 rounded-lg font-medium transform transition-all duration-300 hover:-translate-y-1 active:translate-y-0 ${
                victory 
                  ? "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-lg" 
                  : "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-md hover:shadow-lg"
              }`}
            >
              <span className="flex items-center justify-center">
                {victory ? "Jogar Novamente" : "Tentar Novamente"}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
            </button>
          </div>
          
          {/* Reflexão final */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600 italic text-center animate-fadeIn" style={{ animationDelay: '1.2s' }}>
            <p>
              "O jogo da hegemonia no campo brasileiro continua, com diferentes atores disputando
              o poder de definir os rumos da agricultura e da sociedade."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}