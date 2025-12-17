
import React, { useState, useCallback } from 'react';
import { GameState, ResultCategory } from './types';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Loading from './components/Loading';
import Paywall from './components/Paywall';
import Result from './components/Result';
import { quizQuestions } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [score, setScore] = useState<number>(0);
  const [resultCategory, setResultCategory] = useState<ResultCategory | null>(null);

  const handleStartQuiz = useCallback(() => {
    setGameState(GameState.Playing);
  }, []);

  const handleQuizComplete = useCallback((finalScore: number) => {
    setScore(finalScore);
    if (finalScore >= 9 && finalScore <= 15) {
      setResultCategory(ResultCategory.Jovem);
    } else if (finalScore >= 16 && finalScore <= 22) {
      setResultCategory(ResultCategory.Amadurecimento);
    } else if (finalScore >= 23 && finalScore <= 29) {
      setResultCategory(ResultCategory.Adulta);
    } else {
      setResultCategory(ResultCategory.Sabia);
    }
    setGameState(GameState.Loading);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setGameState(GameState.Paywall);
  }, []);

  const handleUnlockResult = useCallback(() => {
    setGameState(GameState.Result);
  }, []);

  const handleRestart = useCallback(() => {
    setScore(0);
    setResultCategory(null);
    setGameState(GameState.Start);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        return <Quiz questions={quizQuestions} onComplete={handleQuizComplete} />;
      case GameState.Loading:
        return <Loading onComplete={handleLoadingComplete} />;
      case GameState.Paywall:
        return <Paywall onUnlock={handleUnlockResult} resultCategory={resultCategory} />;
      case GameState.Result:
        return <Result score={score} category={resultCategory} onRestart={handleRestart} />;
      case GameState.Start:
      default:
        return <Landing onStart={handleStartQuiz} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
