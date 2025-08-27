
import React from 'react';
import { Icon } from './Icon';

interface HelpModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const HelpModalContent: React.FC = () => (
    <>
      <h3 className="text-xl font-bold text-indigo-400 mb-4">멋진 프롬프트를 위한 팁</h3>
      <ul className="space-y-3 text-gray-300 mb-6 list-disc list-inside">
        <li>
          <strong>구체적으로 작성하세요:</strong> "멋지게 만들어줘" 대신 "어둡고 분위기 있는 도시 배경과 네온 불빛이 있는 영화 포스터처럼"이라고 시도해보세요.
        </li>
        <li>
          <strong>스타일을 정의하세요:</strong> "실사 사진처럼", "유화", "카툰 스타일", "빈티지 폴라로이드", "3D 렌더링" 같은 키워드를 사용하세요.
        </li>
        <li>
          <strong>분위기를 묘사하세요:</strong> "꿈꾸는 듯한", "활기찬", "평온한", "불길한", "즐거운" 같은 단어들이 결과물에 영향을 줄 수 있습니다.
        </li>
        <li>
          <strong>요소들을 명확하게 결합하세요:</strong> 이미지들이 어떻게 상호작용해야 하는지 명시적으로 설명하세요. 예: "이미지 1의 인물을 이미지 2의 풍경에 배치해주세요."
        </li>
        <li>
          <strong>구도를 언급하세요:</strong> "클로즈업 샷", "광각 뷰", "로우 앵글에서" 같은 용어를 사용하여 시점에 영향을 줄 수 있습니다.
        </li>
      </ul>

      <h3 className="text-xl font-bold text-red-400 mb-4">콘텐츠 정책</h3>
      <p className="text-gray-400">
        책임감 있고 존중하는 자세를 보여주세요. 유해하거나, 증오심을 표현하거나, 괴롭히거나, 타인의 사생활을 침해하는 콘텐츠를 만들지 마세요. 모든 생성된 이미지는 Google의 생성형 AI 정책을 따릅니다.
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline ml-1">더 알아보기.</a>
      </p>
    </>
)

export const HelpModal: React.FC<HelpModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
    >
      <div
        className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
            <h2 id="help-modal-title" className="text-2xl font-bold flex items-center">
                <Icon name="help" className="w-7 h-7 mr-3 text-gray-400"/>
                도움말 및 가이드라인
            </h2>
            <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="도움말 모달 닫기"
            >
                <Icon name="close" className="w-6 h-6" />
            </button>
        </div>
        <div className="border-t border-gray-700 pt-4">
           <HelpModalContent />
        </div>
      </div>
    </div>
  );
};