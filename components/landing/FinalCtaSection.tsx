
import React from 'react';
import CliCopy from '../ui/CliCopy';

const FinalCtaSection = (): React.ReactNode => {
  return (
    <section className="text-center py-20 md:py-32">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
        지금 바로 시작해보세요
      </h2>
      <p className="mt-4 max-w-xl mx-auto text-lg text-gray-400">
        터미널을 열고, 아래 명령어를 붙여넣어 당신의 아이디어를 현실로 만드세요.
      </p>
      <CliCopy textToCopy="npx firstvibe" />
    </section>
  );
};

export default FinalCtaSection;
