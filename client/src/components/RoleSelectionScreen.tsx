import { PlayerRole } from "../game/gameTypes";
import { ROLE_DESCRIPTIONS } from "../game/gameConstants";

interface RoleSelectionScreenProps {
  playerName: string;
  selectedRole: PlayerRole | null;
  onNameChange: (name: string) => void;
  onRoleSelect: (role: PlayerRole) => void;
  onStartGame: () => void;
  roleDescriptions: typeof ROLE_DESCRIPTIONS;
}

export default function RoleSelectionScreen({
  playerName,
  selectedRole,
  onNameChange,
  onRoleSelect,
  onStartGame,
  roleDescriptions
}: RoleSelectionScreenProps) {
  
  // Função para renderizar o cartão de um papel
  const renderRoleCard = (role: PlayerRole) => {
    const description = roleDescriptions[role];
    const isSelected = selectedRole === role;
    
    // Define cores específicas para cada papel
    const getRoleColors = () => {
      switch (role) {
        case PlayerRole.AGRIBUSINESS:
          return {
            bg: isSelected ? "bg-blue-50" : "bg-white",
            border: isSelected ? "border-blue-500" : "border-gray-200 hover:border-blue-300",
            title: "text-blue-800",
            icon: "🏭",
            iconBg: "bg-blue-100",
            iconText: "text-blue-800"
          };
        case PlayerRole.FAMILY_FARMER:
          return {
            bg: isSelected ? "bg-green-50" : "bg-white",
            border: isSelected ? "border-green-500" : "border-gray-200 hover:border-green-300",
            title: "text-green-800",
            icon: "🌱",
            iconBg: "bg-green-100",
            iconText: "text-green-800"
          };
        case PlayerRole.POLITICIAN:
          return {
            bg: isSelected ? "bg-purple-50" : "bg-white",
            border: isSelected ? "border-purple-500" : "border-gray-200 hover:border-purple-300",
            title: "text-purple-800",
            icon: "🏛️",
            iconBg: "bg-purple-100",
            iconText: "text-purple-800"
          };
        case PlayerRole.ACTIVIST:
          return {
            bg: isSelected ? "bg-amber-50" : "bg-white",
            border: isSelected ? "border-amber-500" : "border-gray-200 hover:border-amber-300",
            title: "text-amber-800",
            icon: "✊",
            iconBg: "bg-amber-100",
            iconText: "text-amber-800"
          };
        default:
          return {
            bg: isSelected ? "bg-green-50" : "bg-white",
            border: isSelected ? "border-green-500" : "border-gray-200 hover:border-green-300",
            title: "text-green-800",
            icon: "❓",
            iconBg: "bg-green-100",
            iconText: "text-green-800"
          };
      }
    };
    
    const colors = getRoleColors();
    
    return (
      <div
        onClick={() => onRoleSelect(role)}
        className={`border ${colors.border} ${colors.bg} rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${
          isSelected ? "shadow-md transform scale-105" : ""
        }`}
      >
        <div className="flex items-start mb-3">
          <div className={`${colors.iconBg} h-10 w-10 rounded-full flex items-center justify-center text-xl ${colors.iconText} mr-3 flex-shrink-0`}>
            {colors.icon}
          </div>
          <h3 className={`font-bold text-lg ${colors.title}`}>{description.title}</h3>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 min-h-[60px]">{description.description}</p>
        
        <div className="mb-3 bg-gray-50 rounded-lg p-2">
          <h4 className="text-xs font-bold text-gray-600 uppercase mb-1">Pontos Fortes</h4>
          <ul className="list-disc pl-5 text-xs text-gray-700">
            {description.strengths.map((strength, index) => (
              <li key={index} className="mb-1">{strength}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-2">
          <h4 className="text-xs font-bold text-gray-600 uppercase mb-1">Desafios</h4>
          <ul className="list-disc pl-5 text-xs text-gray-700">
            {description.weaknesses.map((weakness, index) => (
              <li key={index} className="mb-1">{weakness}</li>
            ))}
          </ul>
        </div>
        
        {isSelected && (
          <div className="mt-3 text-center">
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">
              Selecionado
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-700 p-4 lg:p-8 bg-[url('/images/bg-pattern.svg')] bg-fixed bg-cover">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-green-100">
        <div className="p-6 md:p-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2 text-center tracking-tight animate-fadeIn">
            Agronegócio e Poder
          </h1>
          <h2 className="text-xl text-center text-gray-600 mb-8 animate-fadeIn">
            Escolha seu Papel no Jogo da Hegemonia
          </h2>
          
          <div className="mb-8 max-w-md mx-auto">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="playerName">
              Seu Nome
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm transition-all"
              required
            />
          </div>
          
          <div className="mb-10">
            <h3 className="text-gray-700 font-semibold text-lg mb-4 text-center">Selecione seu Papel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                PlayerRole.AGRIBUSINESS,
                PlayerRole.FAMILY_FARMER,
                PlayerRole.POLITICIAN,
                PlayerRole.ACTIVIST
              ].map((role, index) => (
                <div key={role} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                  {renderRoleCard(role)}
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={onStartGame}
              disabled={!playerName.trim() || !selectedRole}
              className="px-8 py-3.5 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="flex items-center justify-center">
                Iniciar Jogo
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
            </button>
            <p className="text-gray-500 text-sm mt-3">
              {!playerName.trim() && "Digite seu nome para continuar"}
              {playerName.trim() && !selectedRole && "Selecione um papel para continuar"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}