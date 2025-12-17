
import { Question, ResultCategory } from './types';

export const quizQuestions: Question[] = [
  {
    question: '1. Quando algo importante dá errado, você costuma:',
    answers: [
      { text: 'A) Culpar outras pessoas ou o azar', score: 1 },
      { text: 'B) Se culpar excessivamente', score: 2 },
      { text: 'C) Analisar o que aconteceu e ajustar', score: 3 },
      { text: 'D) Assumir e mudar rapidamente', score: 4 },
    ],
  },
  {
    question: '2. Seu dinheiro normalmente:',
    answers: [
      { text: 'A) Acaba antes do mês', score: 1 },
      { text: 'B) Dá, mas sem sobrar', score: 2 },
      { text: 'C) Sobra um pouco', score: 3 },
      { text: 'D) É planejado e previsível', score: 4 },
    ],
  },
  {
    question: '3. Quando surge um problema novo:',
    answers: [
      { text: 'A) Travo', score: 1 },
      { text: 'B) Reclamo primeiro', score: 2 },
      { text: 'C) Tento resolver', score: 3 },
      { text: 'D) Anteciparia para não acontecer', score: 4 },
    ],
  },
  {
    question: '4. Você começa projetos e:',
    answers: [
      { text: 'A) Abandona quase todos', score: 1 },
      { text: 'B) Termina poucos', score: 2 },
      { text: 'C) Termina a maioria', score: 3 },
      { text: 'D) Só começa o que vai terminar', score: 4 },
    ],
  },
    {
    question: '5. Como você reage a críticas?',
    answers: [
      { text: 'A) Me defendo', score: 1 },
      { text: 'B) Fico mal por muito tempo', score: 2 },
      { text: 'C) Avalio se faz sentido', score: 3 },
      { text: 'D) Uso para melhorar', score: 4 },
    ],
  },
  {
    question: '6. Sua rotina é:',
    answers: [
      { text: 'A) Caótica', score: 1 },
      { text: 'B) Irregular', score: 2 },
      { text: 'C) Organizada', score: 3 },
      { text: 'D) Estratégica', score: 4 },
    ],
  },
    {
    question: '7. Quando precisa tomar uma decisão difícil:',
    answers: [
      { text: 'A) Procrastino', score: 1 },
      { text: 'B) Peço muitas opiniões', score: 2 },
      { text: 'C) Analiso prós e contras', score: 3 },
      { text: 'D) Decido e assumo', score: 4 },
    ],
  },
    {
    question: '8. Pensando no futuro, você:',
    answers: [
      { text: 'A) Evita pensar', score: 1 },
      { text: 'B) Se preocupa, mas não age', score: 2 },
      { text: 'C) Planeja', score: 3 },
      { text: 'D) Executa', score: 4 },
    ],
  },
    {
    question: '9. Você se sente mais confortável:',
    answers: [
      { text: 'A) Vivendo o agora', score: 1 },
      { text: 'B) Indo conforme dá', score: 2 },
      { text: 'C) Construindo estabilidade', score: 3 },
      { text: 'D) Pensando no longo prazo', score: 4 },
    ],
  },
];

export const resultDescriptions: Record<ResultCategory, { title: string, description: string }> = {
    [ResultCategory.Jovem]: {
        title: "Jovem",
        description: "Suas decisões tendem a ser mais reativas e focadas no presente. Você pode se beneficiar de uma análise mais aprofundada das consequências a longo prazo e do desenvolvimento de maior responsabilidade pessoal sobre os resultados."
    },
    [ResultCategory.Amadurecimento]: {
        title: "Em Amadurecimento",
        description: "Você está no caminho do desenvolvimento da maturidade decisória. Já reconhece a importância do planejamento e da análise, mas ainda pode oscilar entre a reatividade e a proatividade. A consistência é seu próximo grande passo."
    },
    [ResultCategory.Adulta]: {
        title: "Adulta",
        description: "Você demonstra um bom equilíbrio entre análise, responsabilidade e ação. Suas decisões são geralmente ponderadas, e você consegue gerenciar bem os recursos e as emoções para atingir seus objetivos de forma consistente."
    },
    [ResultCategory.Sabia]: {
        title: "Sábia",
        description: "Seu padrão decisório é altamente proativo e estratégico. Você não apenas resolve problemas, mas os antecipa. Suas escolhas são guiadas por uma visão clara de longo prazo, demonstrando grande autodisciplina e sabedoria prática."
    }
};
