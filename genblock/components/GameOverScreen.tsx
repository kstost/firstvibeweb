
import React from 'react';
import { TrophyIcon } from './IconComponents';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export const GameOverScreen = ({ score, highScore, onRestart }: GameOverScreenProps): React.ReactNode => {
  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg text-center flex flex-col items-center animate-fade-in">
        <h2 className="text-4xl font-bold text-red-500 mb-2">Game Over</h2>
        <p className="text-slate-300 text-lg mb-6">You ran out of time or moves!</p>
        
        <div className="flex gap-4 mb-8">
            <div className="bg-slate-700 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">FINAL SCORE</p>
                <p className="text-4xl font-bold text-white">{score}</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
                 <p className="text-slate-400 text-sm flex items-center justify-center gap-1"><TrophyIcon className="w-4 h-4"/> HIGH SCORE</p>
                <p className="text-4xl font-bold text-yellow-400">{highScore}</p>
            </div>
        </div>

        {score === highScore && score > 0 && (
            <p className="text-yellow-400 font-semibold mb-6 flex items-center gap-2">
                <TrophyIcon className="w-6 h-6"/> New High Score!
            </p>
        )}

        <button
          onClick={onRestart}
          className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
    `}</style>
    </div>
  );
};
