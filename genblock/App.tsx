
import React from 'react';
import GameScreen from './screens/GameScreen';

function App(): React.ReactNode {
  return (
    <main className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-4">
          <h1 className="text-4xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-sky-400">
            AI Gen Block
          </h1>
          <p className="text-slate-400">
            <a href="https://cokac.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              코드깎는노인 Edition
            </a>
          </p>
        </header>
        <GameScreen />
      </div>
    </main>
  );
}

export default App;
