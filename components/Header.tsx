
import React from 'react';
import CopyButton from './CopyButton';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="text-2xl font-bold text-slate-900 focus-ring rounded-md">
            firstvibe
          </a>
          <div className="hidden sm:block">
            <CopyButton className="px-4 py-2 text-sm" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
