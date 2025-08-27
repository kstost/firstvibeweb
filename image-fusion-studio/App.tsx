
import React, { useState, useEffect, useCallback } from 'react';
import { ApiKeyInput } from './components/ApiKeyInput';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { HelpModal } from './components/HelpModal';
import { Icon } from './components/Icon';
import { Spinner } from './components/Spinner';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { AppState, ImageFile, ApiError } from './types';
import { fileToBase64 } from './services/imageUtils';
import { generateImage } from './services/geminiService';
import { MAX_IMAGES, MIN_IMAGES } from './constants';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useLocalStorage<string>('gemini-api-key', '');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [appState, setAppState] = useState<AppState>('idle');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isHelpVisible, setIsHelpVisible] = useState<boolean>(false);

  const canSubmit = apiKey.trim() !== '' && images.length >= MIN_IMAGES && images.length <= MAX_IMAGES && prompt.trim() !== '' && appState !== 'loading';

  const resetState = useCallback(() => {
    setAppState('idle');
    setResultImage(null);
    setError(null);
  }, []);
  
  const handleNewProject = () => {
    setImages([]);
    setPrompt('');
    resetState();
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setAppState('loading');
    setError(null);
    setResultImage(null);

    try {
      const imageParts = await Promise.all(
        images.map(async (imageFile) => {
          const base64 = await fileToBase64(imageFile.file);
          return {
            mimeType: imageFile.file.type,
            base64,
          };
        })
      );

      const generatedImage = await generateImage({
        apiKey,
        prompt,
        images: imageParts,
      });

      setResultImage(`data:${generatedImage.mimeType};base64,${generatedImage.base64}`);
      setAppState('success');
    } catch (err) {
      setError(err as ApiError);
      setAppState('error');
    }
  };

  useEffect(() => {
    // Reset if inputs change after a result is shown
    if (appState === 'success' || appState === 'error') {
      resetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, prompt]);
  
  const StatusIndicator = () => {
    switch (appState) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center h-full">
            <Spinner />
            <p className="text-lg text-gray-400">Synthesizing your image...</p>
            <p className="text-sm text-gray-500">This can take a moment. Please wait.</p>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center space-y-3 p-6 text-center bg-red-900/20 border border-red-500/30 rounded-lg h-full">
            <Icon name="error" className="w-10 h-10 text-red-400" />
            <p className="text-lg font-semibold text-red-400">{error?.message || 'An unknown error occurred'}</p>
            {error?.hint && <p className="text-sm text-gray-300">{error.hint}</p>}
            <button
              onClick={resetState}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
            >
              Try Again
            </button>
          </div>
        );
      case 'idle':
        if(images.length === 0) {
           return (
              <div className="flex flex-col items-center justify-center p-8 text-center h-full border-2 border-dashed border-gray-700 rounded-lg">
                <Icon name="image" className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-400">Your Fused Image Will Appear Here</h3>
                <p className="text-gray-500 mt-2">Start by uploading your images and writing a prompt.</p>
              </div>
            );
        }
        return null;
      case 'success':
        return null; // ResultDisplay will be shown
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Icon name="logo" className="w-8 h-8 text-indigo-400"/>
              <h1 className="text-xl font-bold tracking-tight">Image Fusion Studio</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsHelpVisible(true)} className="text-gray-400 hover:text-white transition-colors">
                <Icon name="help" className="w-6 h-6" />
              </button>
              <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Column: Inputs */}
          <div className="flex flex-col space-y-8">
            <ImageUploader images={images} setImages={setImages} disabled={appState === 'loading'}/>
            <PromptInput prompt={prompt} setPrompt={setPrompt} disabled={appState === 'loading'}/>
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-700/50">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Icon name="sparkles" className={`w-5 h-5 mr-2 ${appState === 'loading' ? 'animate-pulse' : ''}`}/>
                {appState === 'loading' ? 'Generating...' : 'Generate Image'}
              </button>
               <button
                  onClick={handleNewProject}
                  className="px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200"
                  disabled={appState === 'loading'}
                >
                  New Project
                </button>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="bg-gray-800/50 rounded-lg flex items-center justify-center p-4 min-h-[300px] lg:min-h-0">
             {resultImage ? (
                <ResultDisplay imageSrc={resultImage} onNewProject={handleNewProject} />
              ) : (
                <StatusIndicator />
              )}
          </div>
        </div>
      </main>
      
      <HelpModal isVisible={isHelpVisible} onClose={() => setIsHelpVisible(false)} />
    </div>
  );
};

export default App;
