(function () {
  'use strict';

  // React, ReactDOM, clsx, and tailwindMerge are expected to be available globally from the CDN scripts in index.html.
  const { useState, useEffect, useRef } = React;

  // From: lib/utils.ts
  function cn(...inputs) {
    return tailwindMerge.twMerge(clsx(inputs));
  }

  // From: components/icons.tsx
  const AutomationIcon = ({ className }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.575L16.5 21.75l-.398-1.175a3.375 3.375 0 00-2.456-2.456L12.75 18l1.175-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.175a3.375 3.375 0 002.456 2.456L20.25 18l-1.175.398a3.375 3.375 0 00-2.456 2.456z" }));
  const OneLinerIcon = ({ className }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }));
  const EasyIcon = ({ className }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75z" }));
  const NonDevIcon = ({ className }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" }));
  const CopyIcon = ({ className }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" }));
  const CheckIcon = ({ className }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }));
  const GithubIcon = ({ className }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, viewBox: "0 0 16 16", fill: "currentColor" }, React.createElement('path', { d: "M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 8 0Z" }));
  const NpmIcon = ({ className }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, viewBox: "0 0 24 24", fill: "currentColor" }, React.createElement('path', { d: "M0 7.33v9.34h12V7.33H0zm5.33 8h-4V8.67h4v6.66zM12 16.67h-5.33V8.67h1.33v6.66h2.67V8.67h1.33v8zM24 7.33v8h-1.33V8.67h-2.67v6.66h-5.33V7.33H24z" }));
  const YoutubeIcon = ({ className }) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, viewBox: "0 0 24 24", fill: "currentColor" }, React.createElement('path', { d: "M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.25,4,12,4,12,4S5.75,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.75,2,12,2,12s0,4.25,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.75,20,12,20,12,20s6.25,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.25,22,12,22,12S22,7.75,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" }));

  // From: components/ui/ParticleCanvas.tsx
  const ParticleCanvas = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const container = canvas.parentElement;
      if (!container) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let animationFrameId;
      let particles = [];
      class Particle {
        constructor(x, y, size, speedX, speedY) {
          this.x = x; this.y = y; this.size = size; this.speedX = speedX; this.speedY = speedY;
        }
        update() {
          if (!canvas) return;
          if (this.x > canvas.width || this.x < 0) { this.speedX = -this.speedX; }
          if (this.y > canvas.height || this.y < 0) { this.speedY = -this.speedY; }
          this.x += this.speedX;
          this.y += this.speedY;
        }
        draw() {
          if (!ctx) return;
          ctx.fillStyle = 'rgba(196, 181, 253, 0.8)';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      const init = () => {
        if (!canvas) return;
        particles = [];
        const numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
          const size = Math.random() * 2 + 1;
          const x = Math.random() * (canvas.width - size * 2) + size;
          const y = Math.random() * (canvas.height - size * 2) + size;
          const speedX = (Math.random() - 0.5) * 0.5;
          const speedY = (Math.random() - 0.5) * 0.5;
          particles.push(new Particle(x, y, size, speedX, speedY));
        }
      };
      const resizeCanvas = () => {
        if (canvas && container) {
          canvas.width = container.offsetWidth;
          canvas.height = container.offsetHeight;
          init();
        }
      };
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      const connect = () => {
        if (!ctx || !canvas) return;
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
          for (let b = a; b < particles.length; b++) {
            const distance = Math.sqrt(Math.pow(particles[a].x - particles[b].x, 2) + Math.pow(particles[a].y - particles[b].y, 2));
            if (distance < 120) {
              opacityValue = 1 - (distance / 120);
              ctx.strokeStyle = `rgba(196, 181, 253, ${opacityValue})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      };
      const animate = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const particle of particles) {
          particle.update();
          particle.draw();
        }
        connect();
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }, []);
    return React.createElement('canvas', { ref: canvasRef, className: "absolute top-0 left-0 w-full h-full z-0" });
  };
  
  // From: components/ui/CliCopy.tsx
  const CliCopy = ({ textToCopy }) => {
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

    return React.createElement('div', {
        onClick: handleCopy,
        className: "group relative cursor-pointer font-mono text-sm md:text-base inline-flex items-center gap-4 p-3 pr-12 my-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:bg-white/10"
      },
      React.createElement('span', { className: "text-purple-300" }, "$"),
      React.createElement('span', { className: "text-gray-200" }, textToCopy),
      React.createElement('div', { className: "absolute right-4 top-1/2 -translate-y-1/2" },
        React.createElement('div', { className: cn('transition-opacity duration-300', isCopied ? 'opacity-0' : 'opacity-100') },
            React.createElement(CopyIcon, { className: "w-5 h-5 text-gray-400 group-hover:text-white transition-colors" })
        ),
        React.createElement('div', { className: cn('absolute top-0 left-0 transition-opacity duration-300', isCopied ? 'opacity-100' : 'opacity-0') },
            React.createElement(CheckIcon, { className: "w-5 h-5 text-green-400" })
        )
      ),
      React.createElement('div', { className: cn("absolute -right-2 -top-2 px-2 py-0.5 rounded-full bg-green-400 text-gray-900 text-xs font-semibold transition-all duration-300", isCopied ? "opacity-100 scale-100" : "opacity-0 scale-90") }, "Copied!")
    );
  };
  
  // From: components/landing/HeroSection.tsx
  const HeroSection = () => {
    return React.createElement('section', { className: "relative overflow-hidden text-center py-20 md:py-32" },
      React.createElement('div', { className: "absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0" }),
      React.createElement('div', { className: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(121,_91,_255,_0.15),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,_91,_166,_0.15),_transparent_40%)] z-0" }),
      React.createElement(ParticleCanvas, null),
      React.createElement('div', { className: "relative z-10" },
        React.createElement('h1', { className: "text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400" }, "바이브코딩의 첫 시작, firstvibe."),
        React.createElement('p', { className: "mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400" }, "당신의 한 문장의 아이디어를 확장시켜 MVP로 만들기 위한 토대를 만들어드립니다."),
        React.createElement(CliCopy, { textToCopy: "npx firstvibe" })
      ),
      React.createElement('div', { className: "absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-gray-900 to-transparent z-5" })
    );
  };

  // From: components/landing/HowItWorksSection.tsx
  const StepCard = ({ number, title, description }) => React.createElement('div', { className: "flex flex-col items-center text-center" },
      React.createElement('div', { className: "relative mb-4" },
          React.createElement('div', { className: "w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-2xl font-bold" }, number)
      ),
      React.createElement('h3', { className: "font-bold text-lg text-white" }, title),
      React.createElement('p', { className: "text-gray-400 text-sm" }, description)
  );
  const Arrow = () => React.createElement('div', { className: "text-purple-400 opacity-50 text-4xl hidden md:block" }, "\u2192");
  const HowItWorksSection = () => {
    return React.createElement('section', { className: "py-16 md:py-24" },
      React.createElement('h2', { className: "text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400" }, '"한 문장으로 시작하세요."'),
      React.createElement('p', { className: "text-xl text-gray-400 text-center mb-12" }, "How it works"),
      React.createElement('div', { className: "flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12" },
        React.createElement(StepCard, { number: 1, title: "한 문장 아이디어 입력", description: "당신의 핵심 아이디어를 한 문장으로 입력하세요." }),
        React.createElement(Arrow, null),
        React.createElement(StepCard, { number: 2, title: "Q&A 진행", description: "AI가 이끄는 질문에 답하며 아이디어를 구체화합니다." }),
        React.createElement(Arrow, null),
        React.createElement(StepCard, { number: 3, title: "산출물 자동 생성", description: "PRD, TRD, Todo list 등 핵심 문서가 생성됩니다." })
      )
    );
  };

  // From: components/landing/FeaturesSection.tsx
  const features = [
    { icon: React.createElement(AutomationIcon, { className: "w-8 h-8 text-purple-400" }), title: 'Q&A 주도식 자동화', description: '간단한 질문 답변으로 아이디어를 구체화하고 PRD, TRD, Todo list를 자동으로 완성합니다.' },
    { icon: React.createElement(OneLinerIcon, { className: "w-8 h-8 text-purple-400" }), title: '한 문장으로 시작', description: '복잡한 기획서 없이, 당신의 핵심 아이디어 한 문장이면 충분합니다.' },
    { icon: React.createElement(EasyIcon, { className: "w-8 h-8 text-purple-400" }), title: '쉽고, 간편하고, 무료', description: '설치나 학습 과정 없이 누구나 즉시 무료로 사용할 수 있습니다.' },
    { icon: React.createElement(NonDevIcon, { className: "w-8 h-8 text-purple-400" }), title: '비개발자를 위한 설계', description: '코딩 지식이 없어도, 논코더도 쉽게 제품의 첫 단계를 만들 수 있습니다.' },
  ];
  const FeatureCard = ({ icon, title, description }) => React.createElement('div', { className: "p-6 bg-gray-800/50 rounded-xl border border-white/10 backdrop-blur-lg transform transition-transform duration-300 hover:-translate-y-1" },
      React.createElement('div', { className: "mb-4" }, icon),
      React.createElement('h3', { className: "font-bold text-lg mb-2 text-white" }, title),
      React.createElement('p', { className: "text-gray-400" }, description)
  );
  const FeaturesSection = () => {
    return React.createElement('section', { className: "py-16 md:py-24" },
      React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" },
        features.map((feature) => React.createElement(FeatureCard, { key: feature.title, ...feature }))
      )
    );
  };

  // From: components/landing/TargetAudienceSection.tsx
  const audience = [
    "초기 단계 스타트업 창업가",
    "사이드 프로젝트를 시작하려는 개발자/기획자",
    "아이디어를 빠르게 검증하고 싶은 프로덕트 매니저",
    "개발자와의 소통을 위한 명확한 문서가 필요한 비개발자",
  ];
  const TargetAudienceSection = () => {
    return React.createElement('section', { className: "py-16 md:py-24 text-center" },
      React.createElement('h2', { className: "text-3xl md:text-4xl font-bold mb-8 text-white" }, "이런 분들께 추천합니다"),
      React.createElement('div', { className: "max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left" },
        audience.map((item, index) => React.createElement('div', { key: index, className: "flex items-center space-x-3 p-4 bg-gray-800/30 rounded-lg" },
          React.createElement('svg', { className: "w-6 h-6 text-green-400 flex-shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
            React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })
          ),
          React.createElement('span', { className: "text-gray-300" }, item)
        ))
      )
    );
  };
  
  // From: components/landing/FinalCtaSection.tsx
  const FinalCtaSection = () => {
    return React.createElement('section', { className: "text-center py-20 md:py-32" },
      React.createElement('h2', { className: "text-3xl md:text-4xl font-bold tracking-tight text-white" }, "지금 바로 시작해보세요"),
      React.createElement('p', { className: "mt-4 max-w-xl mx-auto text-lg text-gray-400" }, "터미널을 열고, 아래 명령어를 붙여넣어 당신의 아이디어를 현실로 만드세요."),
      React.createElement(CliCopy, { textToCopy: "npx firstvibe" })
    );
  };
  
  // From: components/landing/Footer.tsx
  const Footer = () => {
    return React.createElement('footer', { className: "border-t border-white/10 py-8" },
      React.createElement('div', { className: "container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left" },
        React.createElement('p', { className: "text-gray-500 text-sm mb-4 sm:mb-0" }, `© ${new Date().getFullYear()} firstvibe. All rights reserved.`),
        React.createElement('div', { className: "flex items-center space-x-4" },
          React.createElement('a', { href: "https://github.com/kstost/firstvibe", target: "_blank", rel: "noopener noreferrer", className: "text-gray-500 hover:text-white transition-colors" }, React.createElement(GithubIcon, { className: "w-6 h-6" })),
          React.createElement('a', { href: "https://www.npmjs.com/package/firstvibe", target: "_blank", rel: "noopener noreferrer", className: "text-gray-500 hover:text-white transition-colors" }, React.createElement(NpmIcon, { className: "w-6 h-6" })),
          React.createElement('a', { href: "https://www.youtube.com/@%EC%BD%94%EB%93%9C%EA%B9%8E%EB%8A%94%EB%85%B8%EC%9D%B8", target: "_blank", rel: "noopener noreferrer", className: "text-gray-500 hover:text-white transition-colors" }, React.createElement(YoutubeIcon, { className: "w-6 h-6" }))
        )
      )
    );
  };
  
  // From: App.tsx
  function App() {
    return React.createElement('div', { className: "bg-gray-900 text-white font-sans antialiased overflow-x-hidden" },
      React.createElement('div', { className: "relative z-20" },
        React.createElement(HeroSection, null),
        React.createElement('main', { className: "container mx-auto px-6 py-12 md:py-20" },
          React.createElement(HowItWorksSection, null),
          React.createElement(FeaturesSection, null),
          React.createElement(TargetAudienceSection, null),
          React.createElement(FinalCtaSection, null)
        ),
        React.createElement(Footer, null)
      )
    );
  }

  // From: index.tsx
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    React.createElement(React.StrictMode, null,
      React.createElement(App, null)
    )
  );

})();