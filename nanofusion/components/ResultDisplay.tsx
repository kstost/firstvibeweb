
import React from 'react';
import { Icon } from './Icon';

interface ResultDisplayProps {
  imageSrc: string;
  onNewProject: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageSrc, onNewProject }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    const extension = imageSrc.split(';')[0].split('/')[1] || 'png';
    link.download = `fused-image-${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 space-y-4 animate-fade-in">
      <div className="w-full max-w-lg aspect-square relative group">
        <img src={imageSrc} alt="Generated result" className="w-full h-full object-contain rounded-lg shadow-lg" />
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleDownload}
          className="hidden sm:inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
        >
          <Icon name="download" className="w-5 h-5 mr-2" />
          다운로드
        </button>
        <button
          onClick={onNewProject}
          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
        >
          <Icon name="plus" className="w-5 h-5 mr-2" />
          새 프로젝트
        </button>
      </div>
    </div>
  );
};