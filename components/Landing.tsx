
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="text-center p-4 animate-fade-in">
      <div className="mb-8 mx-auto max-w-[250px] md:max-w-[300px]">
        <svg
          viewBox="0 0 300 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgb(129, 140, 248)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(192, 132, 252)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <g stroke="url(#grad1)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Young */}
            <path d="M 60,70 A 20,20 0 1,1 60,30 A 20,20 0 1,1 60,70" />
            <path d="M 55,45 Q 57,47 59,45" />
            <path d="M 48,42 C 52,38 58,38 62,42" />
            <path d="M 55,52 L 53,55" />
            <path d="M 55,60 A 5,3 0 0,0 60,60" />
            <path d="M 70,55 C 80,65 75,85 60,90 C 45,85 40,65 50,55" />
            <path d="M 38,50 C 30,60 35,80 45,85" />

            {/* Mature */}
            <path d="M 150,70 A 20,20 0 1,1 150,30 A 20,20 0 1,1 150,70" />
            <path d="M 145,45 Q 147,46 149,45" />
            <path d="M 138,42 C 142,39 148,39 152,42" />
            <path d="M 145,53 L 144,55" />
            <path d="M 145,61 A 5,2 0 0,0 150,61" />
            <path d="M 150,70 V 90" />
            <path d="M 130,88 H 170" />
            <path d="M 165,45 C 175,55 170,75 160,80" />
            <path d="M 135,45 C 125,55 130,75 140,80" />

            {/* Elderly */}
            <path d="M 240,70 A 20,20 0 1,1 240,30 A 20,20 0 1,1 240,70" />
            <path d="M 233,43 C 237,40 243,40 247,43" />
            <path d="M 235,58 A 5,3 0 0,0 242,58" />
            <path d="M 230,48 A 10,10 0 0,1 250,48" />
            <path d="M 228,48 L 220,45" />
            <path d="M 252,48 L 260,45" />
            <path d="M 245,28 A 10,8 0 0,1 235,28 C 235,20 245,20 245,28" />
            <path d="M 225,55 C 228,52 232,52 235,55" />
            <path d="M 245,55 C 248,52 252,52 255,55" />
          </g>
        </svg>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-4 leading-tight">
        Qual é a sua IDADE MENTAL nas decisões da vida?
      </h1>
      <h2 className="text-lg md:text-xl text-gray-700 mb-6">
        Um teste rápido de autoconhecimento baseado em padrões de decisão.
      </h2>
      <p className="text-gray-600 mb-4 max-w-sm mx-auto">
        Responda 9 perguntas rápidas e descubra como você costuma lidar com escolhas, responsabilidades e consequências.
      </p>
      <p className="text-gray-600 mb-10 max-w-sm mx-auto">
        Para as próximas perguntas, por favor, escolha a opção que acredita representar melhor a sua personalidade.
      </p>
      <button
        onClick={onStart}
        className="w-full md:w-auto bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-primary-hover transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg shadow-indigo-500/30 text-lg"
      >
        Começar o teste
      </button>
      <footer className="mt-20">
        <p className="text-xs text-gray-500">
          Teste informativo. Não substitui avaliação profissional.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
