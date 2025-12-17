
import React, { useState, useEffect } from 'react';

interface LoadingProps {
  onComplete: () => void;
}

const loadingMessages = [
  'Analisando suas respostas...',
  'Calculando sua maturidade decisória...',
  'Cruzando padrões psicológicos...',
  'Preparando seu insight...',
  'Quase pronto!',
];

const Loading: React.FC<LoadingProps> = ({ onComplete }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => {
        if (prevIndex < loadingMessages.length - 1) {
          return prevIndex + 1;
        }
        clearInterval(interval);
        return prevIndex;
      });
    }, 1200);

    const timeout = setTimeout(() => {
      onComplete();
    }, 1200 * loadingMessages.length + 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  return (
    <div className="text-center flex flex-col items-center justify-center p-4 animate-fade-in h-64">
        <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin mb-6"></div>
        <p className="text-lg text-gray-700 transition-opacity duration-500">
            {loadingMessages[messageIndex]}
        </p>
    </div>
  );
};

export default Loading;