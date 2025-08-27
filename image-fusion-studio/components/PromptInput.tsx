
import React from 'react';
import { MAX_PROMPT_LENGTH } from '../constants';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, disabled }) => {
  const promptLength = prompt.length;
  const lengthColor = promptLength > MAX_PROMPT_LENGTH ? 'text-red-400' : 'text-gray-400';

  return (
    <div className="space-y-4">
       <h2 className="text-lg font-semibold">2. Describe Your Vision</h2>
      <div className="relative">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="e.g., 'Combine these images into a cinematic movie poster with a dark, moody city background...'"
          className="w-full h-32 p-3 bg-gray-800/50 text-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={disabled}
          maxLength={MAX_PROMPT_LENGTH + 100} // Allow overtyping to show error
        />
        <div className={`absolute bottom-3 right-3 text-xs ${lengthColor}`}>
          {promptLength} / {MAX_PROMPT_LENGTH}
        </div>
      </div>
    </div>
  );
};
