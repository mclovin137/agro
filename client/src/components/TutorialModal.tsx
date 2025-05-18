import { useState, useEffect } from "react";
import BackgroundPattern from "./BackgroundPattern";

interface TutorialModalProps {
  onClose: () => void;
}

export default function TutorialModal({ onClose }: TutorialModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [showContent, setShowContent] = useState(false);
  
  // Efeito para animar a entrada do modal
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Lista de seções do tutorial
  const sections = [
    { title: "Introdução", icon: "📜" },
    { title: "Papéis", icon: "👤" },
    { title: "Recursos", icon: "💰" },
    { title: "Territórios", icon: "🗺️" },
    { title: "Eventos", icon: "⚡" },
    { title: "Estratégias", icon: "🧠" }
  ];
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`bg-white/95 rounded-xl shadow-2xl max-w-5xl w-full my-8 border border-gray-100 transition-all duration-500 ${
        showContent ? "opacity-100 transform-none" : "opacity-0 translate-y-12"
      }`}>
        <div className="p-5 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-t-xl z-10 relative overflow-hidden">
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
          
          <div className="relative z-10 flex items-center">
            <span className="text-2xl mr-3">📚</span>
            <h2 className="text-2xl font-bold tracking-tight">Tutorial: Agronegócio e Poder</h2>
          </div>
          <button 
            onClick={onClose}
            className="relative z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 transition-colors"
            aria-label="Fechar tutorial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Navegação por abas */}
        <div className="flex bg-gray-50 border-b border-gray-200 overflow-x-auto">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-sm whitespace-nowrap transition-colors flex items-center ${
                activeTab === index 
                  ? "border-b-2 border-green-500 text-green-700 font-medium bg-white" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.title}
            </button>
          ))}
        </div>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Conteúdo baseado na aba selecionada */}
          {activeTab === 0 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🌄</span>
                <h3 className="text-2xl font-bold text-green-700">Bem-vindo a Agronegócio e Poder!</h3>
              </div>
              
              <div className="bg-green-50 p-5 rounded-lg border border-green-100 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Este jogo explora como o agronegócio se consolidou no Brasil, indo além das relações de produção econômica
                  para influenciar políticas, sociedade e cultura. Você pode escolher diferentes papéis e explorar
                  o impacto de suas decisões no campo brasileiro.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="flex items-center text-lg font-bold text-green-700 mb-3">
                    <span className="text-xl mr-2">🗓️</span> Contexto histórico
                  </h4>
                  <p className="text-gray-700">
                    O jogo se passa durante a evolução do agronegócio no Brasil, começando na década de 1960 com a 
                    Revolução Verde e se estendendo até os dias atuais, mostrando como as relações de poder no campo
                    brasileiro se transformaram nesse período.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="flex items-center text-lg font-bold text-green-700 mb-3">
                    <span className="text-xl mr-2">🎮</span> Objetivo do jogo
                  </h4>
                  <p className="text-gray-700">
                    Construir hegemonia e poder no campo brasileiro através de diferentes estratégias, seja pela 
                    expansão do agronegócio, resistência camponesa, articulação política ou mobilização social.
                    Cada papel tem diferentes condições de vitória!
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-lg border border-amber-100">
                <h4 className="flex items-center text-lg font-bold text-amber-700 mb-3">
                  <span className="text-xl mr-2">💡</span> Conceito central
                </h4>
                <p className="text-gray-700 mb-4">
                  O jogo explora o conceito de <strong>hegemonia</strong>, que vai além do poder econômico e inclui
                  a capacidade de um grupo social estabelecer seus valores e visão de mundo como dominantes
                  na sociedade. No contexto agrário brasileiro, isso significa disputar o modelo de desenvolvimento
                  rural que prevalecerá.
                </p>
                <p className="text-gray-600 italic text-sm">
                  "Hegemonia não é apenas domínio, mas a capacidade de direção moral e intelectual de um grupo social sobre outros."
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 1 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">👥</span>
                <h3 className="text-2xl font-bold text-green-700">Papéis no Jogo</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                Escolha entre quatro papéis fundamentais que disputam poder no campo brasileiro. Cada papel tem
                recursos iniciais, vantagens, desvantagens e estratégias diferentes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">🏭</span>
                    <h4 className="text-lg font-bold text-blue-700">Grande Produtor Rural</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>Foco em monoculturas de grande escala</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>Alta capacidade de investimento inicial</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>Boa influência política e acesso a crédito</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Menor reputação social e sustentabilidade</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-5 border border-green-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">🌱</span>
                    <h4 className="text-lg font-bold text-green-700">Agricultor Familiar</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Diversidade de culturas e sustentabilidade</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Melhor reputação com comunidades locais</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Resistência através de redes de cooperação</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Recursos econômicos limitados no início</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-5 border border-purple-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">🏛️</span>
                    <h4 className="text-lg font-bold text-purple-700">Político-Legislador</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Alta influência política e capacidade de mediação</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Pode criar políticas favorecendo diferentes atores</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Acesso a informações privilegiadas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Precisa balancear interesses conflitantes</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-5 border border-amber-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">✊</span>
                    <h4 className="text-lg font-bold text-amber-700">Líder Sindical-Ativista</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">✓</span>
                      <span>Forte mobilização social e pressão política</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">✓</span>
                      <span>Alta reputação com movimentos sociais</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">✓</span>
                      <span>Capacidade de resistência coletiva</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Recursos econômicos muito limitados</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 2 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">💰</span>
                <h3 className="text-2xl font-bold text-green-700">Recursos</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                No jogo, você gerencia quatro tipos de recursos fundamentais que representam diferentes
                formas de capital e poder no campo brasileiro.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-lg border border-yellow-200 transition-all hover:shadow-md">
                  <h4 className="text-lg font-bold text-yellow-800 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Econômico
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Representa seu capital financeiro, usado para investir em cultivos, comprar terras e equipamentos,
                    e financiar ações estratégicas.
                  </p>
                  <div className="bg-white bg-opacity-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600">
                      <strong>Como obter:</strong> Vendendo colheitas, exportando produtos, conseguindo financiamentos e investimentos.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200 transition-all hover:shadow-md">
                  <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Influência
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Seu poder político e capacidade de influenciar decisões, legislações, políticas públicas
                    e alianças estratégicas.
                  </p>
                  <div className="bg-white bg-opacity-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600">
                      <strong>Como obter:</strong> Participando de assembleias, formando alianças políticas, financiando campanhas
                      ou realizando ações de resistência.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border border-purple-200 transition-all hover:shadow-md">
                  <h4 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Social
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Sua reputação e legitimidade junto às comunidades rurais, movimentos sociais,
                    opinião pública e outros atores sociais.
                  </p>
                  <div className="bg-white bg-opacity-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600">
                      <strong>Como obter:</strong> Implementando projetos comunitários, práticas justas de contratação,
                      apoiando causas sociais ou organizando a resistência.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border border-green-200 transition-all hover:shadow-md">
                  <h4 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ambiental
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Representa a sustentabilidade de suas práticas e o impacto ambiental positivo ou negativo
                    de suas decisões no território.
                  </p>
                  <div className="bg-white bg-opacity-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600">
                      <strong>Como obter:</strong> Adotando práticas sustentáveis, diversificando culturas,
                      preservando áreas naturais e evitando uso excessivo de agrotóxicos.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-lg border border-gray-200 mb-4">
                <h4 className="text-lg font-bold text-gray-700 mb-3">Equilíbrio de Recursos</h4>
                <p className="text-gray-700">
                  O segredo para o sucesso no jogo é equilibrar esses recursos de acordo com sua estratégia.
                  Cada papel terá facilidade em acumular certos recursos, mas precisará trabalhar para desenvolver outros.
                  Suas decisões nos eventos determinarão como seus recursos aumentarão ou diminuirão.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 3 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🗺️</span>
                <h3 className="text-2xl font-bold text-green-700">Territórios</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                O controle de territórios é fundamental para estabelecer hegemonia no campo. 
                No jogo, você gerencia e expande seu território para aumentar sua produção e influência.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-5 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-green-700 mb-3">Tipos de Território</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-5 h-5 bg-blue-500 rounded-sm mr-3 flex-shrink-0"></div>
                      <span><strong>Territórios de jogador</strong> - Áreas sob seu controle direto</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 bg-red-500 rounded-sm mr-3 flex-shrink-0"></div>
                      <span><strong>Territórios de latifundiários</strong> - Controlados por grandes proprietários</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-sm mr-3 flex-shrink-0"></div>
                      <span><strong>Áreas de cooperativas</strong> - Territórios coletivos</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 bg-gray-500 rounded-sm mr-3 flex-shrink-0"></div>
                      <span><strong>Áreas bloqueadas</strong> - Territórios inacessíveis inicialmente</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 p-5 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-amber-700 mb-3">Expansão Territorial</h4>
                  <p className="text-gray-700 mb-3">
                    Para expandir seu território, você precisará:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">➤</span>
                      <span>Acumular recursos suficientes (econômicos, influência, reputação)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">➤</span>
                      <span>Superar a resistência dos latifundiários através de negociação ou pressão</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">➤</span>
                      <span>Participar de assembleias para ganhar apoio comunitário</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">➤</span>
                      <span>Clicar em territórios adjacentes para tentar adquiri-los</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
                <h4 className="text-lg font-bold text-gray-700 mb-3">Uso da Terra</h4>
                <p className="text-gray-700 mb-4">
                  Depois de adquirir um território, você pode definir como utilizá-lo:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                    <h5 className="font-semibold text-blue-700 mb-2">Produção Agrícola</h5>
                    <p className="text-sm text-gray-600">Cultivo de alimentos e commodities para venda e exportação</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
                    <h5 className="font-semibold text-purple-700 mb-2">Centro Comunitário</h5>
                    <p className="text-sm text-gray-600">Aumenta influência e reputação social na região</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md border border-green-100">
                    <h5 className="font-semibold text-green-700 mb-2">Reserva Ambiental</h5>
                    <p className="text-sm text-gray-600">Aumenta recursos ambientais e reputação</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
                    <h5 className="font-semibold text-amber-700 mb-2">Centro de Pesquisa</h5>
                    <p className="text-sm text-gray-600">Desenvolve novas tecnologias e aumenta influência</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 4 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">⚡</span>
                <h3 className="text-2xl font-bold text-green-700">Eventos</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                Eventos dinâmicos ocorrem ao longo do jogo, representando os desafios e oportunidades
                do campo brasileiro. Suas decisões nesses eventos moldarão sua trajetória.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                  <h4 className="flex items-center text-lg font-bold text-blue-700 mb-3">
                    <span className="text-xl mr-2">🌦️</span> Eventos Climáticos
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Secas, chuvas intensas, geadas ou condições ideais que afetam a produtividade.
                  </p>
                  <div className="bg-white bg-opacity-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600">
                      <strong>Exemplo:</strong> Uma seca intensa atinge a região. Você pode:
                      <br/>• Investir em irrigação (alto custo)
                      <br/>• Buscar ajuda governamental (depende de influência)
                      <br/>• Mudar temporariamente de cultura (reduz lucros)
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-lg border border-amber-200 hover:shadow-md transition-shadow">
                  <h4 className="flex items-center text-lg font-bold text-amber-700 mb-3">
                    <span className="text-xl mr-2">💹</span> Eventos de Mercado
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Flutuações de preço, novos acordos comerciais ou crises econômicas.
                  </p>
                  <div className="bg-white bg-opacity-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600">
                      <strong>Exemplo:</strong> O preço da soja dispara no mercado internacional. Você pode:
                      <br/>• Aumentar a produção de soja (mais lucro, menos sustentabilidade)
                      <br/>• Manter sua estratégia diversificada (equilíbrio)
                      <br/>• Negociar contratos de exportação (necessita influência)
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-5 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
                  <h4 className="flex items-center text-lg font-bold text-red-700 mb-3">
                    <span className="text-xl mr-2">⚔️</span> Resistência dos Latifundiários
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Reações dos grandes proprietários à sua expansão territorial.
                  </p>
                  <div className="bg-white bg-opacity-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600">
                      <strong>Exemplo:</strong> Um bloqueio comercial é imposto pelos latifundiários. Você pode:
                      <br/>• Enfrentar juridicamente (necessita recursos e influência)
                      <br/>• Buscar rotas alternativas (reduz lucros)
                      <br/>• Negociar um acordo (compromete parte da autonomia)
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                  <h4 className="flex items-center text-lg font-bold text-purple-700 mb-3">
                    <span className="text-xl mr-2">🏛️</span> Assembleias Comunitárias
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Espaços de decisão coletiva onde políticas locais são definidas.
                  </p>
                  <div className="bg-white bg-opacity-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600">
                      <strong>Exemplo:</strong> Uma assembleia discute o uso de agrotóxicos na região. Você pode:
                      <br/>• Defender o uso moderado (equilibra economia e ambiente)
                      <br/>• Apoiar a proibição total (ganha reputação, perde produtividade)
                      <br/>• Propor alternativas tecnológicas (necessita conhecimento)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm mb-4">
                <h4 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Impacto das Decisões
                </h4>
                <p className="text-gray-700">
                  Cada decisão em um evento afetará seus recursos positiva ou negativamente. Além disso,
                  suas escolhas podem desbloquear novos eventos ou oportunidades no futuro, criando
                  caminhos narrativos únicos baseados em seu estilo de jogo e papel escolhido.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 5 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">🧠</span>
                <h3 className="text-2xl font-bold text-green-700">Estratégias e Vitória</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                Cada papel tem estratégias e condições de vitória diferentes, alinhadas com seus objetivos
                no contexto do agronegócio brasileiro. Conheça as principais abordagens:
              </p>
              
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200">
                  <h4 className="flex items-center text-lg font-bold text-blue-700 mb-3">
                    <span className="text-2xl mr-2">🏭</span> 
                    Estratégia do Grande Produtor Rural
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Focada na expansão rápida, maximização de lucros, intensificação tecnológica e 
                    influência sobre políticas públicas favoráveis ao agronegócio.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white bg-opacity-80 p-3 rounded-md">
                      <h5 className="font-medium text-blue-700 mb-1">Táticas Recomendadas</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Monoculturas de alta escala e mecanização</li>
                        <li>• Foco em commodities de exportação</li>
                        <li>• Alianças com políticos e grandes empresas</li>
                        <li>• Integração com cadeias globais de valor</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white bg-opacity-80 p-3 rounded-md">
                      <h5 className="font-medium text-blue-700 mb-1">Condições de Vitória</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Acumular R$ 100.000 em recursos econômicos</li>
                        <li>• Controlar 30 lotes de terra</li>
                        <li>• Atingir 1.000 pontos de influência</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-lg border border-green-200">
                  <h4 className="flex items-center text-lg font-bold text-green-700 mb-3">
                    <span className="text-2xl mr-2">🌱</span> 
                    Estratégia do Agricultor Familiar
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Baseada na diversificação produtiva, sustentabilidade, fortalecimento de redes locais
                    e construção de alternativas ao modelo do agronegócio.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white bg-opacity-80 p-3 rounded-md">
                      <h5 className="font-medium text-green-700 mb-1">Táticas Recomendadas</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Cultivos diversificados e agroecológicos</li>
                        <li>• Formação de cooperativas e associações</li>
                        <li>• Circuitos curtos de comercialização</li>
                        <li>• Recuperação de sementes crioulas</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white bg-opacity-80 p-3 rounded-md">
                      <h5 className="font-medium text-green-700 mb-1">Condições de Vitória</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Atingir 1.000 pontos em recursos ambientais</li>
                        <li>• Estabelecer 20 lotes de terra sustentáveis</li>
                        <li>• Atingir 1.000 pontos de reputação social</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-lg border border-purple-200">
                  <h4 className="flex items-center text-lg font-bold text-purple-700 mb-3">
                    <span className="text-2xl mr-2">🏛️</span> 
                    Estratégia do Político-Legislador
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Centrada na mediação de conflitos, construção de coalizões políticas e definição
                    de legislações e políticas públicas para o setor agrícola.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white bg-opacity-80 p-3 rounded-md">
                      <h5 className="font-medium text-purple-700 mb-1">Táticas Recomendadas</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Construção de base de apoio diversificada</li>
                        <li>• Elaboração de projetos de lei estratégicos</li>
                        <li>• Negociação com grupos de interesse</li>
                        <li>• Captação de recursos para projetos rurais</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white bg-opacity-80 p-3 rounded-md">
                      <h5 className="font-medium text-purple-700 mb-1">Condições de Vitória</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Atingir 1.500 pontos de influência política</li>
                        <li>• Aprovar 10 grandes políticas agrícolas</li>
                        <li>• Equilibrar os recursos econômicos e sociais</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-5 rounded-lg border border-amber-200">
                  <h4 className="flex items-center text-lg font-bold text-amber-700 mb-3">
                    <span className="text-2xl mr-2">✊</span> 
                    Estratégia do Líder Sindical-Ativista
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Focada na mobilização social, denúncia de injustiças, ocupação de terras improdutivas
                    e luta pela reforma agrária e direitos dos trabalhadores rurais.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white bg-opacity-80 p-3 rounded-md">
                      <h5 className="font-medium text-amber-700 mb-1">Táticas Recomendadas</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Organização de assentamentos coletivos</li>
                        <li>• Formação política de base</li>
                        <li>• Pressão por políticas de reforma agrária</li>
                        <li>• Alianças com movimentos urbanos</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white bg-opacity-80 p-3 rounded-md">
                      <h5 className="font-medium text-amber-700 mb-1">Condições de Vitória</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Atingir 1.500 pontos de reputação social</li>
                        <li>• Estabelecer 15 assentamentos coletivos</li>
                        <li>• Conquistar 800 pontos de influência política</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center"
            >
              <span className="mr-2">Começar a Jogar</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
