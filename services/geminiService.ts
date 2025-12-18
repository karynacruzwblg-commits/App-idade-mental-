
import { GoogleGenAI } from "@google/genai";
import { ResultCategory } from '../types';

export const generateAnalysis = async (category: ResultCategory): Promise<string> => {
  // FIX: Switched to process.env.API_KEY and removed manual key checking to align with the coding guidelines. This also resolves the TypeScript error for 'import.meta.env'.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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
    // FIX: Access response text via the .text property.
    return response.text ?? "Não foi possível gerar a análise. Tente novamente.";
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    // FIX: Updated error message to be more generic and not mention API keys, as per guidelines.
    return "Ocorreu um erro ao gerar sua análise personalizada. Por favor, tente novamente mais tarde.";
  }
};
