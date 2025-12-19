
import React, { useState, useEffect } from 'react';
import { ResultCategory } from '../types';
import { resultDescriptions } from '../constants';
import { GoogleGenAI } from "@google/genai";

// Movido para cá para melhor encapsulamento e para usar o streaming
const generateAnalysisStream = async (
  category: ResultCategory,
  onStream: (chunk: string) => void,
  onComplete: () => void
) => {
  // Pega a API Key do ambiente. Usamos VITE_GEMINI_API_KEY por convenção do Vite.
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  // VERIFICAÇÃO CRÍTICA: Se a chave não existir, mostra uma mensagem de erro clara.
  if (!apiKey || apiKey === "undefined") {
    console.error("ERRO: VITE_GEMINI_API_KEY não está configurada.");
    onStream(
      "Erro de configuração: A chave da API do Google não foi encontrada. \n\n" +
      "Se você é o desenvolvedor, adicione a variável de ambiente 'VITE_GEMINI_API_KEY' nas configurações do seu projeto na Vercel."
    );
    onComplete();
    return;
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `
    Baseado em um resultado de quiz psicológico que indica uma "Idade Mental ${category}", 
    forneça uma análise curta (2 parágrafos), encorajadora e perspicaz para o usuário.
    Use um tom positivo e reflexivo. A resposta deve ser em Português do Brasil.
    Não inicie com "Com base no resultado...". Comece diretamente com a análise.
    Não se apresente como uma IA. Fale diretamente com o usuário.
    `;

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    for await (const chunk of response) {
      if (chunk.text) {
        onStream(chunk.text);
      }
    }
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    onStream("Ocorreu um erro ao gerar sua análise personalizada. A chave da API pode ser inválida ou a API está temporariamente indisponível.");
  } finally {
    onComplete();
  }
};


const Result: React.FC<{
  score: number;
  category: ResultCategory | null;
  onRestart: () => void;
}> = ({ score, category, onRestart }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (category) {
      setIsLoading(true);
      setAnalysis(''); // Limpa a análise anterior
      
      const streamAnalysis = async () => {
        await generateAnalysisStream(
          category, 
          (chunk) => {
            setAnalysis((prev) => prev + chunk);
          },
          () => {
            setIsLoading(false);
          }
        );
      };

      streamAnalysis();
    }
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
          <div className="text-gray-700 whitespace-pre-wrap min-h-[5rem]">
            {analysis}
            {isLoading && (
              <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" aria-label="digitando..."></span>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onRestart}
          className="w-full md:w-auto bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-300 transition-all duration-200"
          disabled={isLoading}
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

// Adicionado React.memo para evitar re-renderizações desnecessárias do componente de resultado.
export default React.memo(Result);
