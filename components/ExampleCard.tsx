
import React, { useState } from 'react';
import type { ExampleProject } from '../types';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface ExampleCardProps {
  project: ExampleProject;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <p className="text-sm font-semibold text-blue-600">한 문장 아이디어</p>
        <h3 className="mt-2 text-xl font-bold text-slate-900">{project.oneLiner}</h3>
        <div className="mt-4 border-t border-slate-200 pt-4">
          <p className="text-sm font-semibold text-slate-700">생성 요약</p>
          <ul className="mt-2 space-y-2 text-slate-600">
            {project.summary.map((item, i) => (
              <li key={i} className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-1 text-cyan-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
             <div className="bg-slate-50 border-t border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-700">상세 내용 (PRD/TRD 하이라이트)</p>
                <ul className="mt-2 space-y-2 text-slate-600 text-sm">
                  {project.details.map((item, i) => (
                    <li key={i} className="whitespace-pre-wrap">{item}</li>
                  ))}
                </ul>
             </div>
          </div>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-slate-100 hover:bg-slate-200 p-3 text-sm font-semibold text-slate-700 flex items-center justify-center gap-2 focus-ring"
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? '간략히' : '더 보기'}</span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
};

export default ExampleCard;
