
import React from 'react';
import { EXAMPLE_PROJECTS } from '../constants';
import ExampleCard from './ExampleCard';

const Examples: React.FC = () => {
  return (
    <section id="examples" className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            실제 결과물 미리보기
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            다양한 아이디어가 어떻게 체계적인 문서로 변환되는지 확인해보세요.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXAMPLE_PROJECTS.map(project => (
            <ExampleCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Examples;
