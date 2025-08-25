import React from 'react';
import CliCopy from '../ui/CliCopy';
import ParticleCanvas from '../ui/ParticleCanvas';

const HeroSection = (): React.ReactNode => {
  return (
    <section className="relative overflow-hidden text-center py-20 md:py-32">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(121,_91,_255,_0.15),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,_91,_166,_0.15),_transparent_40%)] z-0"></div>
      <ParticleCanvas />
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          바이브코딩의 첫 시작, firstvibe.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
          당신의 한 문장의 아이디어를 확장시켜 MVP로 만들기 위한 토대를 만들어드립니다.
        </p>
        <CliCopy textToCopy="npx firstvibe" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-gray-900 to-transparent z-5"></div>
    </section>
  );
};

export default HeroSection;