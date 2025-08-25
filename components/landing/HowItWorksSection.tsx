
import React from 'react';

const StepCard: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
    <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-2xl font-bold">
                {number}
            </div>
        </div>
        <h3 className="font-bold text-lg text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

const Arrow = (): React.ReactNode => (
    <div className="text-purple-400 opacity-50 text-4xl hidden md:block">
        &rarr;
    </div>
);


const HowItWorksSection = (): React.ReactNode => {
  return (
    <section className="pt-0 pb-16 md:pb-24">
      <div className="flex justify-center mb-8">
        <video 
          className="w-full max-w-4xl aspect-video rounded-xl shadow-2xl"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="./demo.mov" type="video/mp4" />
          <source src="./demo.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
        "한 문장으로 시작하세요."
      </h2>
      <p className="text-xl text-gray-400 text-center mb-12">
        How it works
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <StepCard number={1} title="한 문장 아이디어 입력" description="당신의 핵심 아이디어를 한 문장으로 입력하세요." />
          <Arrow />
          <StepCard number={2} title="Q&A 진행" description="AI가 이끄는 질문에 답하며 아이디어를 구체화합니다." />
          <Arrow />
          <StepCard number={3} title="산출물 자동 생성" description="PRD, TRD, Todo list 등 핵심 문서가 생성됩니다." />
      </div>
    </section>
  );
};

export default HowItWorksSection;