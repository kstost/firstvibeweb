import React from 'react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { CopyIcon, CheckIcon } from '../icons';
import '../../types'; // Import to ensure global types are loaded

interface CliCopyProps {
  textToCopy: string;
}

const CliCopy: React.FC<CliCopyProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      if (window.gtag) {
        window.gtag('event', 'copy_cli_command', {
          'event_category': 'engagement',
          'event_label': 'cli_copy_button'
        });
      }
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div
      onClick={handleCopy}
      className="group relative cursor-pointer font-mono text-sm md:text-base inline-flex items-center gap-4 p-3 pr-12 my-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:bg-white/10"
    >
      <span className="text-purple-300">$</span>
      <span className="text-gray-200">{textToCopy}</span>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className={cn('transition-opacity duration-300', isCopied ? 'opacity-0' : 'opacity-100')}>
            <CopyIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        </div>
        <div className={cn('absolute top-0 left-0 transition-opacity duration-300', isCopied ? 'opacity-100' : 'opacity-0')}>
            <CheckIcon className="w-5 h-5 text-green-400" />
        </div>
      </div>
       <div className={cn(
        "absolute -right-2 -top-2 px-2 py-0.5 rounded-full bg-green-400 text-gray-900 text-xs font-semibold transition-all duration-300",
        isCopied ? "opacity-100 scale-100" : "opacity-0 scale-90"
      )}>
        Copied!
      </div>
    </div>
  );
};

export default CliCopy;