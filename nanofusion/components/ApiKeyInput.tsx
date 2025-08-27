
import React, { useState } from 'react';
import { Icon } from './Icon';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative flex items-center">
      <input
        type={isVisible ? 'text' : 'password'}
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Gemini API 키를 입력하세요"
        className="w-full bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
        aria-label={isVisible ? 'API 키 숨기기' : 'API 키 보기'}
      >
        <Icon name={isVisible ? 'eyeOff' : 'eye'} className="w-5 h-5" />
      </button>
    </div>
  );
};
