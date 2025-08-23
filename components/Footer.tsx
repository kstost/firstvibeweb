
import React from 'react';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', href: '#' },
    { name: 'Twitter', href: '#' },
  ];

  const policyLinks = [
    { name: '이용약관', href: '#' },
    { name: '개인정보처리방침', href: '#' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-2xl font-bold text-white">firstvibe</p>
            <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} firstvibe. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            {socialLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-white transition-colors focus-ring rounded-md" target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm">
          <div className="flex justify-center space-x-4">
            {policyLinks.map(link => (
               <a key={link.name} href={link.href} className="hover:text-white transition-colors focus-ring rounded-md">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
