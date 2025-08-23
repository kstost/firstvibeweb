
import React, from 'react';
import { useState } from 'react';
import { useToast } from '../hooks/useToast';
import { copyToClipboard } from '../lib/copy';
import { COMMAND_TO_COPY } from '../constants';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

const CopyButton: React.FC<{ className?: string }> = ({ className }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    if (isCopied) return;

    const { success } = await copyToClipboard(COMMAND_TO_COPY);
    if (success) {
      showToast('명령어가 복사되었습니다', 'success');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } else {
      showToast('복사에 실패했습니다. 다시 시도해주세요.', 'error');
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="명령어 복사"
      className={`focus-ring inline-flex items-center justify-center gap-3 px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
        isCopied
          ? 'bg-green-600 text-white'
          : 'bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900'
      } ${className}`}
    >
      <span className="font-mono text-lg">{COMMAND_TO_COPY}</span>
      {isCopied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
    </button>
  );
};

export default CopyButton;
