
import { GoogleGenAI } from "@google/genai";
import { ResultCategory } from '../types';

export const generateAnalysis = async (category: ResultCategory): Promise<string> => {
  // FIX: Get API key from process.env.API_KEY per coding guidelines. This resolves the TypeScript error.
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API_KEY não encontrada. Verifique suas variáveis de ambiente.");
    return "A análise personalizada não está disponível no momento. A configuração da API está ausente.";
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
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a análise. Tente novamente.";
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    return "Ocorreu um erro ao gerar sua análise personalizada. Por favor, verifique se sua chave da API é válida e se a configuração está correta.";
  }
};
