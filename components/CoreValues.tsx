
import React from 'react';
import { CORE_VALUES } from '../constants';
import CopyButton from './CopyButton';

const CoreValues: React.FC = () => {
  return (
    <section id="core-values" className="py-20 sm:py-24 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            아이디어를 현실로 만드는 가장 빠른 길
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            firstvibe는 복잡한 과정을 자동화하여, 당신이 가장 중요한 것, 즉 아이디어의 본질에 집중할 수 있도록 돕습니다.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_VALUES.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
              <p className="mt-2 text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <CopyButton />
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
