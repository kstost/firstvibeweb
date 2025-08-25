
import React from 'react';
import { AutomationIcon, OneLinerIcon, EasyIcon, NonDevIcon } from '../icons';

const features = [
  {
    icon: <AutomationIcon className="w-8 h-8 text-purple-400" />,
    title: 'Q&A 주도식 자동화',
    description: '간단한 질문 답변으로 아이디어를 구체화하고 PRD, TRD, Todo list를 자동으로 완성합니다.',
  },
  {
    icon: <OneLinerIcon className="w-8 h-8 text-purple-400" />,
    title: '한 문장으로 시작',
    description: '복잡한 기획서 없이, 당신의 핵심 아이디어 한 문장이면 충분합니다.',
  },
  {
    icon: <EasyIcon className="w-8 h-8 text-purple-400" />,
    title: '쉽고, 간편하고, 무료',
    description: '설치나 학습 과정 없이 누구나 즉시 무료로 사용할 수 있습니다.',
  },
  {
    icon: <NonDevIcon className="w-8 h-8 text-purple-400" />,
    title: '비개발자를 위한 설계',
    description: '코딩 지식이 없어도, 논코더도 쉽게 제품의 첫 단계를 만들 수 있습니다.',
  },
];

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-white/10 backdrop-blur-lg transform transition-transform duration-300 hover:-translate-y-1">
        <div className="mb-4">{icon}</div>
        <h3 className="font-bold text-lg mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);


const FeaturesSection = (): React.ReactNode => {
  return (
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
