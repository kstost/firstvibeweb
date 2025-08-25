
import React from 'react';

const audience = [
    "초기 단계 스타트업 창업가",
    "사이드 프로젝트를 시작하려는 개발자/기획자",
    "아이디어를 빠르게 검증하고 싶은 프로덕트 매니저",
    "개발자와의 소통을 위한 명확한 문서가 필요한 비개발자",
];


const TargetAudienceSection = (): React.ReactNode => {
  return (
    <section className="py-16 md:py-24 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
        이런 분들께 추천합니다
      </h2>
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        {audience.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-lg">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">{item}</span>
            </div>
        ))}
      </div>
    </section>
  );
};

export default TargetAudienceSection;
