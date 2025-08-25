import React from 'react';
import { GithubIcon, NpmIcon, YoutubeIcon } from '../icons';

const Footer = (): React.ReactNode => {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-gray-500 text-sm mb-4 sm:mb-0">
          © {new Date().getFullYear()} firstvibe. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/kstost/firstvibe" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
            <GithubIcon className="w-6 h-6" />
          </a>
          <a href="https://www.npmjs.com/package/firstvibe" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
            <NpmIcon className="w-6 h-6" />
          </a>
          <a href="https://www.youtube.com/@%EC%BD%94%EB%93%9C%EA%B9%8E%EB%8A%94%EB%85%B8%EC%9D%B8" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
            <YoutubeIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;