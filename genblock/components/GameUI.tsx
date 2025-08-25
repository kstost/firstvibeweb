import React, { useState } from 'react';
import { Block as BlockType } from '../types';
import { Block } from './Block';
import { ClockIcon, TrophyIcon, SparklesIcon } from './IconComponents';

interface GameUIProps {
  score: number;
  highScore: number;
  timeLeft: number;
  blocks: BlockType[];
  onBlockDragStart: (e: React.DragEvent, block: BlockType) => void;
  onBlockDragEnd: (e: React.DragEvent) => void;
  onGenerateCreativeBlock: (prompt: string) => Promise<void>;
  onRequestApiKey: () => void;
  isGeneratingBlock: boolean;
  hasApiKey: boolean;
}

const StatDisplay = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }): React.ReactNode => (
    <div className="flex flex-col items-center justify-center bg-slate-800 p-3 rounded-lg text-center">
        <div className="flex items-center gap-2 text-slate-400">
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-2xl font-bold text-white">{value}</span>
    </div>
);


export const GameUI = ({ 
    score, 
    highScore, 
    timeLeft, 
    blocks, 
    onBlockDragStart, 
    onBlockDragEnd, 
    onGenerateCreativeBlock,
    onRequestApiKey,
    isGeneratingBlock,
    hasApiKey
}: GameUIProps): React.ReactNode => {
    const [prompt, setPrompt] = useState('');
    
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleGenerateBlock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt || isGeneratingBlock) return;
        await onGenerateCreativeBlock(prompt);
        setPrompt('');
    };

    return (
        <div className="flex flex-col justify-between w-full h-full p-4 bg-slate-800/50 rounded-lg">
            {/* Stats Header */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <StatDisplay icon={<TrophyIcon className="w-5 h-5"/>} label="High Score" value={highScore} />
                <StatDisplay icon={<div className="text-sky-400 font-black text-lg">SCORE</div>} label="" value={score} />
                <StatDisplay icon={<ClockIcon className="w-5 h-5"/>} label="Time Left" value={formatTime(timeLeft)} />
            </div>

            {/* Block Queue & AI Generation */}
            <div className="flex-grow flex flex-col justify-end">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <div className="flex items-center justify-center min-h-[120px]">
                        {blocks.map((block) => (
                            <Block 
                                key={block.id} 
                                block={block} 
                                onDragStart={onBlockDragStart} 
                                onDragEnd={onBlockDragEnd} 
                            />
                        ))}
                    </div>
                     <form onSubmit={handleGenerateBlock} className="mt-4 flex gap-2">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                value={prompt}
                                onFocus={() => {
                                    const currentApiKey = localStorage.getItem('geminiApiKey');
                                    console.log('Input focused, API key in localStorage:', !!currentApiKey);
                                    if (!currentApiKey) {
                                        console.log('No API key found, showing modal');
                                        onRequestApiKey();
                                    }
                                }}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Generate a block (e.g., 'a small heart')"
                                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 pl-4 pr-10 text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                            />
                            <SparklesIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                        <button 
                            type="submit" 
                            disabled={isGeneratingBlock || !prompt.trim()}
                            className="bg-violet-600 hover:bg-violet-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition-colors w-[60px]"
                        >
                            {isGeneratingBlock ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Gen"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};