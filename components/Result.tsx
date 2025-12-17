
import React, { useState, useEffect } from 'react';
import { ResultCategory } from '../types';
import { resultDescriptions } from '../constants';
import { generateAnalysis } from '../services/geminiService';

interface ResultProps {
  score: number;
  category: ResultCategory | null;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ score, category, onRestart }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (category) {
        setIsLoading(true);
        const generatedText = await generateAnalysis(category);
        setAnalysis(generatedText);
        setIsLoading(false);
      }
    };
    
    fetchAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  if (!category) {
    return (
      <div className="text-center p-4">
        <p>Ocorreu um erro ao calcular seu resultado.</p>
        <button onClick={onRestart} className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded-full">
          Tentar novamente
        </button>
      </div>
    );
  }

  const resultData = resultDescriptions[category];

  return (
    <div className="text-left p-4 sm:p-6 bg-white rounded-lg shadow-2xl animate-slide-in-up">
      <div className="text-center mb-6">
        <p className="text-gray-600">Sua Idade Mental é:</p>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          {resultData.title}
        </h1>
        <p className="text-sm text-gray-500 mt-1">(Pontuação: {score})</p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-secondary mb-2 border-b border-gray-200 pb-2">Descrição Geral</h2>
          <p className="text-gray-700">{resultData.description}</p>
        </div>
        
        <div>
          <h2 className="text-lg font-bold text-secondary mb-2 border-b border-gray-200 pb-2">Análise Personalizada</h2>
          {isLoading ? (
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
              <span>Gerando seu insight...</span>
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap">{analysis}</p>
          )}
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onRestart}
          className="w-full md:w-auto bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-300 transition-all duration-200"
        >
          Refazer o teste
        </button>
      </div>
      <footer className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          Lembre-se: este é um teste informativo e não substitui uma avaliação profissional.
        </p>
      </footer>
    </div>
  );
};

export default Result;