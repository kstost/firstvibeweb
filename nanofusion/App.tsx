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
    // Revoke old URLs to prevent memory leaks
    images.forEach(image => URL.revokeObjectURL(image.previewUrl));
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
      const apiError = err as ApiError;
      setError(apiError);
      if (apiError.code === 'INVALID_API_KEY') {
        setApiKey('');
      }
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
            <p className="text-lg text-gray-400">이미지를 합성하는 중...</p>
            <p className="text-sm text-gray-500">시간이 걸릴 수 있습니다. 잠시만 기다려주세요.</p>
          </div>
        );
      case 'idle':
        if(images.length === 0) {
           return (
              <div className="w-full flex flex-col items-center justify-center p-8 text-center h-full border-2 border-dashed border-gray-700 rounded-lg">
                <Icon name="image" className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-400">합성된 이미지가 여기에 표시됩니다</h3>
                <p className="text-gray-500 mt-2">이미지를 업로드하고 프롬프트를 작성하여 시작하세요.</p>
              </div>
            );
        }
        return null;
       case 'error':
        return (
            <div className="w-full flex flex-col items-center justify-center p-8 text-center h-full border-2 border-dashed border-red-500/50 rounded-lg bg-red-500/10">
                <Icon name="error" className="w-16 h-16 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold text-red-400">{error?.message || '오류가 발생했습니다'}</h3>
                {error?.hint && <p className="text-gray-400 mt-2">{error.hint}</p>}
            </div>
        );
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
              <h1 className="text-xl font-bold tracking-tight">코깎나노퓨전</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsHelpVisible(true)} className="text-gray-400 hover:text-white transition-colors" aria-label="도움말 보기">
                <Icon name="help" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Column: Inputs */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">1. Gemini API 키 설정</h2>
              <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
                <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
                <p className="text-xs text-gray-400">
                  API 키가 없으신가요?{' '}
                  <a
                    href="https://aistudio.google.com/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    Google AI Studio
                  </a>
                  에서 키를 발급받아 붙여넣어 주세요.
                </p>
              </div>
            </div>

            <ImageUploader images={images} setImages={setImages} disabled={appState === 'loading'} />

            <PromptInput prompt={prompt} setPrompt={setPrompt} disabled={appState === 'loading'} />
            
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                aria-label="이미지 합성하기"
              >
                {appState === 'loading' ? (
                  <Spinner />
                ) : (
                  <>
                    <Icon name="sparkles" className="w-5 h-5 mr-2" />
                    이미지 합성하기
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Right Column: Output */}
          <div className="bg-gray-800/20 rounded-lg flex items-center justify-center min-h-[400px] lg:min-h-0">
            {appState === 'success' && resultImage ? (
              <ResultDisplay imageSrc={resultImage} onNewProject={handleNewProject} />
            ) : (
              <StatusIndicator />
            )}
          </div>
        </div>
      </main>
      
      <footer className="text-center p-4 text-xs text-gray-500">
        본 프로그램은 <a href="https://cokac.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">코드깎는노인</a>에 의해서 <a href="https://firstvibe.dev/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">firstvibe</a>의 도움을 받아 만들어졌습니다.
      </footer>

      {isHelpVisible && <HelpModal isVisible={isHelpVisible} onClose={() => setIsHelpVisible(false)} />}
    </div>
  );
};

export default App;
