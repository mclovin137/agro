import React from "react";

interface BackgroundPatternProps {
  className?: string;
}

export default function BackgroundPattern({ className = "" }: BackgroundPatternProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30 ${className}`}>
      {/* Padrões de agricultura e agronegócio */}
      <div className="absolute top-10 left-10 w-32 h-32 text-green-800">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,5 C55,20 60,40 50,60 M50,5 C45,20 40,40 50,60 M50,10 C54,24 58,40 50,60 M50,10 C46,24 42,40 50,60 M50,60 L50,90" 
                stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      
      <div className="absolute top-1/4 right-1/4 w-40 h-40 text-amber-700">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,5 C75,20 75,40 50,60 M50,5 C25,20 25,40 50,60 M50,60 L50,90" 
                stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      
      <div className="absolute bottom-20 left-1/3 w-32 h-32 text-blue-900">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,20 L80,20 L80,80 L20,80 Z M30,30 L70,30 M30,50 L70,50 M30,70 L70,70 M30,30 L30,70 M50,30 L50,70 M70,30 L70,70" 
                stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      
      <div className="absolute top-1/3 left-20 w-36 h-36 text-purple-700">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 4" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
          <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      
      {/* Elemento trator estilizado */}
      <div className="absolute bottom-32 right-20 w-48 h-48 text-gray-800">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30,60 L70,60 L70,70 L80,70 L80,80 L70,80 L70,75 L60,75 L60,80 L30,80 C30,70 20,70 20,80 L10,80 L10,70 L20,70 L20,60 L30,60 Z" 
                stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      
      {/* Padrão de pontos espalhados */}
      <div className="absolute inset-0">
        <div className="absolute top-1/5 left-1/5 w-1 h-1 rounded-full bg-green-900"></div>
        <div className="absolute top-2/5 left-3/5 w-1 h-1 rounded-full bg-green-900"></div>
        <div className="absolute top-3/5 left-2/5 w-1 h-1 rounded-full bg-green-900"></div>
        <div className="absolute top-4/5 left-4/5 w-1 h-1 rounded-full bg-green-900"></div>
        <div className="absolute top-1/6 left-5/6 w-1 h-1 rounded-full bg-green-900"></div>
        <div className="absolute top-5/6 left-1/6 w-1 h-1 rounded-full bg-green-900"></div>
      </div>
    </div>
  );
}