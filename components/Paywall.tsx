
import React from 'react';
import { ResultCategory } from '../types';
import { resultDescriptions } from '../constants';

interface PaywallProps {
  onUnlock: () => void;
  resultCategory: ResultCategory | null;
}

const Paywall: React.FC<PaywallProps> = ({ onUnlock, resultCategory }) => {
  const resultText = resultCategory ? resultDescriptions[resultCategory].description : "Sua análise detalhada está aguardando.";

  return (
    <div className="text-center p-4 animate-fade-in">
        <div className="relative mb-8">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-lg font-bold text-primary mb-2">Sua Idade Mental é: {resultCategory ? resultDescriptions[resultCategory].title : '...'}</h3>
                <p className="text-gray-700">{resultText}</p>
            </div>
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-lg flex items-center justify-center">
            </div>
        </div>

      <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3">Seu resultado está pronto!</h2>
      <p className="text-gray-600 mb-8">
        Desbloqueie seu relatório completo para entender sua Idade Mental e receber insights personalizados gerados por IA.
      </p>
      <button
        onClick={onUnlock}
        className="w-full bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-primary-hover transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg shadow-indigo-500/30 text-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Desbloquear meu resultado agora
      </button>
    </div>
  );
};

export default Paywall;