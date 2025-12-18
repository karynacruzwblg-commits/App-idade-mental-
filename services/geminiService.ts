import { GoogleGenAI } from "@google/genai";
import { ResultCategory } from '../types';

// FIX: Switched to process.env.API_KEY and direct initialization as per Gemini API guidelines to resolve the TypeScript error with `import.meta.env`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAnalysis = async (category: ResultCategory): Promise<string> => {
  // FIX: Removed the explicit API key check. The guidelines state to assume the key is always available.
  const prompt = `
    Baseado em um resultado de quiz psicológico que indica uma "Idade Mental ${category}", 
    forneça uma análise curta (2 parágrafos), encorajadora e perspicaz para o usuário.
    Use um tom positivo e reflexivo. A resposta deve ser em Português do Brasil.
    Não inicie com "Com base no resultado...". Comece diretamente com a análise.
    Não se apresente como uma IA. Fale diretamente com o usuário.
    `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a análise. Tente novamente.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Ocorreu um erro ao gerar sua análise personalizada. Por favor, verifique sua conexão ou a configuração da API.";
  }
};
