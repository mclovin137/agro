import { useState } from "react";

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Conteúdo das slides de introdução
  const slides = [
    {
      title: "Bem-vindo a Agronegócio e Poder",
      content: (
        <>
          <p className="mb-4">
            Este jogo explora como o agronegócio se consolidou no Brasil, indo além das relações 
            de produção econômica para influenciar políticas, sociedade e cultura.
          </p>
          <p>
            Você mergulhará na complexa dinâmica do poder no campo brasileiro, 
            tomando decisões estratégicas que moldarão o futuro agrícola do país.
          </p>
        </>
      )
    },
    {
      title: "A Revolução Verde",
      content: (
        <>
          <p className="mb-4">
            Na década de 1960, o Brasil adotou o modelo da Revolução Verde, caracterizado pela 
            mecanização, uso intensivo de agroquímicos e monoculturas. Esta transformação aumentou 
            a produtividade, mas trouxe consequências sociais e ambientais.
          </p>
          <p>
            O jogo começa neste período histórico, quando as bases do agronegócio moderno brasileiro 
            foram estabelecidas.
          </p>
        </>
      )
    },
    {
      title: "Papéis e Perspectivas",
      content: (
        <>
          <p className="mb-4">
            Você poderá escolher entre quatro papéis diferentes, cada um com seus próprios objetivos, 
            recursos e desafios:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><span className="font-bold">Grande produtor rural (agronegócio)</span> – expande monoculturas e maximiza lucro.</li>
            <li><span className="font-bold">Agricultor familiar</span> – busca alternativas sustentáveis e resistência ao modelo industrial.</li>
            <li><span className="font-bold">Político ou legislador</span> – define políticas públicas e incentivos ao setor.</li>
            <li><span className="font-bold">Líder sindical ou ativista rural</span> – luta por direitos agrários e reforma fundiária.</li>
          </ul>
        </>
      )
    },
    {
      title: "Recursos e Mecânicas",
      content: (
        <>
          <p className="mb-4">
            O jogo utiliza quatro tipos principais de recursos:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><span className="font-bold text-yellow-600">Econômico</span> – Representa seu capital financeiro e capacidade produtiva.</li>
            <li><span className="font-bold text-blue-600">Influência</span> – Seu poder político e capacidade de afetar decisões.</li>
            <li><span className="font-bold text-purple-600">Social</span> – Seu apoio popular e capital social.</li>
            <li><span className="font-bold text-green-600">Ambiental</span> – A saúde dos ecossistemas sob sua influência.</li>
          </ul>
          <p>
            Suas decisões afetarão o equilíbrio desses recursos e determinarão seu caminho para a vitória.
          </p>
        </>
      )
    },
    {
      title: "Pronto para Começar?",
      content: (
        <>
          <p className="mb-4">
            Você está prestes a embarcar em uma jornada pelo Brasil rural, onde suas decisões moldarão 
            não apenas seu destino, mas o futuro da agricultura brasileira.
          </p>
          <p className="mb-4">
            Cada escolha terá consequências - para o ambiente, para as pessoas e para o poder.
          </p>
          <p>
            O jogo da hegemonia está prestes a começar. Que papel você deseja desempenhar?
          </p>
        </>
      )
    }
  ];

  // Avançar para o próximo slide
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  // Voltar para o slide anterior
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Pular a introdução
  const skipIntro = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-700 flex items-center justify-center p-4 bg-[url('/images/bg-pattern.svg')] bg-fixed bg-cover">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl max-w-3xl w-full p-8 border border-green-100 relative">
        <h1 className="text-4xl font-bold text-green-800 mb-3 text-center tracking-tight animate-fadeIn">
          {slides[currentSlide].title}
        </h1>
        
        <div className="h-1.5 w-full bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="prose prose-lg max-w-none mb-8 text-gray-700 animate-fadeIn">
          {slides[currentSlide].content}
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </span>
          </button>
          
          <button
            onClick={skipIntro}
            className="px-4 py-2 text-gray-500 hover:text-gray-700 hover:underline transition focus-visible"
          >
            Pular Introdução
          </button>
          
          <button
            onClick={nextSlide}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 focus-visible"
          >
            <span className="flex items-center">
              {currentSlide < slides.length - 1 ? (
                <>
                  Próximo
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Começar
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </div>
        
        {/* Rodapé com os nomes */}
        <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-500 pt-4 mt-4 border-t border-gray-200">
          Desenvolvido por: Danielly, Jordana e Leandro
        </div>
      </div>
    </div>
  );
}