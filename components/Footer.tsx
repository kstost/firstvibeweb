import React from 'react';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/kstost/firstvibe' },
    { name: 'NPM', href: 'https://www.npmjs.com/package/firstvibe' },
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
      </div>
    </footer>
  );
};

export default Footer;