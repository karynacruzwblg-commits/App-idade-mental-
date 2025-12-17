import React, { useState } from 'react';
import { Question } from '../types';
import ProgressBar from './ProgressBar';

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

interface InterstitialContent {
  title: string;
  subtitle?: string;
  buttonText: string;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [interstitialContent, setInterstitialContent] = useState<InterstitialContent | null>(null);

  const handleAnswerClick = (answerScore: number) => {
    const newScore = score + answerScore;
    setScore(newScore);

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex >= questions.length) {
      onComplete(newScore);
      return;
    }

    let content: InterstitialContent | null = null;
    if (nextQuestionIndex === 4) { // After question 4
      const averageScore = newScore / nextQuestionIndex;
      const tendency = averageScore < 2.5 
        ? "Suas respostas indicam uma tendência a decisões mais espontâneas. Interessante!" 
        : "Até agora, suas escolhas mostram uma inclinação para o planejamento. Continue assim!";
      content = {
        title: "Pequeno insight no meio do caminho...",
        subtitle: tendency,
        buttonText: "Continuar"
      };
    } else if (nextQuestionIndex === 6) { // After question 6
       content = {
        title: "Ótimo! Estamos na reta final.",
        subtitle: "As próximas perguntas são sobre sua visão de futuro.",
        buttonText: "Vamos lá"
      };
    } else if (nextQuestionIndex === 8) { // After question 8
       content = {
        title: "Só mais uma pergunta!",
        subtitle: "Você está prestes a descobrir sua idade mental.",
        buttonText: "Ver última pergunta"
      };
    }

    if (content) {
      setInterstitialContent(content);
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  const handleContinue = () => {
    setInterstitialContent(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (interstitialContent) {
    return (
      <div className="p-4 w-full animate-fade-in">
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
        <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center justify-center text-center min-h-[350px]">
          <h2 className="text-2xl font-bold text-primary mb-3">{interstitialContent.title}</h2>
          {interstitialContent.subtitle && <p className="text-gray-600 mb-8 max-w-xs">{interstitialContent.subtitle}</p>}
          <button
            onClick={handleContinue}
            className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-hover transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {interstitialContent.buttonText}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4 w-full animate-fade-in">
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      <p className="text-center text-sm text-gray-600 mb-4">
        Responda com sinceridade. Não existe resposta certa ou errada.
      </p>
      <div className="bg-white rounded-lg p-6 shadow-xl">
        <h2 className="text-xl md:text-2xl font-bold text-secondary mb-8 text-center min-h-[6rem] flex items-center justify-center">
          {currentQuestion.question}
        </h2>
        <div className="space-y-4">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer.score)}
              className="w-full text-left bg-gray-100 text-gray-800 p-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;