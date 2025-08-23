
import React from 'react';
import CopyButton from './CopyButton';

const CodeIllustration: React.FC = () => (
    <div className="relative mt-12 lg:mt-0 lg:ml-12 w-full max-w-lg">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl p-4">
            <div className="flex space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="text-slate-300 text-sm md:text-base overflow-x-auto">
                <code className="font-mono">
                    <span className="text-sky-400">$</span> npx firstvibe
                    <br />
                    <span className="text-slate-500">?</span> 당신의 아이디어는? (한 문장)
                    <br />
                    <span className="text-yellow-400">&gt;</span> 동네 러닝 커뮤니티 앱
                    <br />
                    <span className="text-green-400">✓</span> PRD 생성 완료
                    <br />
                    <span className="text-green-400">✓</span> TRD 생성 완료
                    <br />
                    <span className="text-green-400">✓</span> Todo List 생성 완료
                </code>
            </pre>
        </div>
    </div>
)


const Hero: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            한 문장으로 시작하세요.
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">MVP의 첫 진동, firstvibe.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
            당신의 한 문장의 아이디어를 확장시켜 MVP로 만들기 위한 토대를 만들어드립니다.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <CopyButton />
          </div>
          <p className="mt-4 text-sm text-slate-500">
            터미널에 붙여넣고 바로 실행하세요.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <CodeIllustration />
        </div>
      </div>
    </section>
  );
};

export default Hero;
