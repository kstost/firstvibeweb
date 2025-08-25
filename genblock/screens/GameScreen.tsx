import React, { useState, useEffect, useCallback } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { GameBoard } from '../components/GameBoard';
import { GameUI } from '../components/GameUI';
import { GameOverScreen } from '../components/GameOverScreen';
import { ApiKeyModal } from '../components/ApiKeyModal';
import { Toast } from '../components/Toast';
import { Block as BlockType } from '../types';
import { generateCreativeBlock } from '../services/geminiService';

const GameScreen = (): React.ReactNode => {
  const {
    board,
    blocks,
    score,
    highScore,
    timeLeft,
    isGameOver,
    gameStarted,
    startGame,
    placeBlock,
    addCreativeBlock
  } = useGameLogic();

  const [draggedBlock, setDraggedBlock] = useState<BlockType | null>(null);
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isGeneratingBlock, setIsGeneratingBlock] = useState(false);
  const [forceRender, setForceRender] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('geminiApiKey');
    if (storedApiKey) {
      setGeminiApiKey(storedApiKey);
    }
  }, []);
  
  const handleSaveApiKey = (apiKey: string) => {
    setGeminiApiKey(apiKey);
    localStorage.setItem('geminiApiKey', apiKey);
    setIsApiKeyModalOpen(false);
  };

  const handleRequestApiKey = useCallback(() => {
    console.log('handleRequestApiKey called');
    setIsApiKeyModalOpen(true);
  }, []);

  const handleCloseToast = useCallback(() => {
    console.log('Toast closed by callback');
    setShowToast(false);
  }, []);

  const handleGenerateCreativeBlock = useCallback(async (prompt: string) => {
    // Always check localStorage for the most current API key
    const currentApiKey = localStorage.getItem('geminiApiKey');
    if (!currentApiKey) {
      setGeminiApiKey('');
      handleRequestApiKey();
      return;
    }
    setIsGeneratingBlock(true);
    try {
      const newShape = await generateCreativeBlock(prompt, currentApiKey);
      if (newShape) {
        addCreativeBlock(newShape);
      }
    } catch (error: any) {
      console.error("Block generation failed:", error);
      // API key was already removed from localStorage in geminiService
      setGeminiApiKey('');
      // Force re-render to update hasApiKey prop
      setForceRender(prev => prev + 1);
      // Show toast with clean error message
      setToastMessage(error.message || 'Failed to generate block');
      setShowToast(true);
    } finally {
      setIsGeneratingBlock(false);
    }
  }, [addCreativeBlock]);

  const handleBlockDragStart = (e: React.DragEvent, block: BlockType) => {
    setDraggedBlock(block);
    e.dataTransfer.setData('application/json', JSON.stringify({ shape: block.shape, color: block.color }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleBlockDragEnd = () => {
    setDraggedBlock(null);
  };

  const handleDrop = (row: number, col: number) => {
    if (draggedBlock) {
      placeBlock(draggedBlock, row, col);
      setDraggedBlock(null);
    }
  };

  if (!gameStarted) {
    return (
        <div className="flex items-center justify-center h-96">
            <div className="w-16 h-16 border-4 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="relative">
      {isGameOver && <GameOverScreen score={score} highScore={highScore} onRestart={startGame} />}
      <ApiKeyModal 
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
      />
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={handleCloseToast}
        type="error"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GameBoard board={board} onDrop={handleDrop} draggedBlock={draggedBlock} />
        <GameUI
          score={score}
          highScore={highScore}
          timeLeft={timeLeft}
          blocks={blocks}
          onBlockDragStart={handleBlockDragStart}
          onBlockDragEnd={handleBlockDragEnd}
          onGenerateCreativeBlock={handleGenerateCreativeBlock}
          onRequestApiKey={handleRequestApiKey}
          isGeneratingBlock={isGeneratingBlock}
          hasApiKey={!!localStorage.getItem('geminiApiKey')}
        />
      </div>
    </div>
  );
};

export default GameScreen;