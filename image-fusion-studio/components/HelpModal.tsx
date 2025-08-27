
import React from 'react';
import { Icon } from './Icon';

interface HelpModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const HelpModalContent: React.FC = () => (
    <>
      <h3 className="text-xl font-bold text-indigo-400 mb-4">Tips for Great Prompts</h3>
      <ul className="space-y-3 text-gray-300 mb-6 list-disc list-inside">
        <li>
          <strong>Be Specific:</strong> Instead of "make it cool", try "cinematic movie poster with a dark, moody city background and neon lights."
        </li>
        <li>
          <strong>Define the Style:</strong> Use keywords like "photorealistic", "oil painting", "cartoon style", "vintage polaroid", or "3D render".
        </li>
        <li>
          <strong>Describe the Mood:</strong> Words like "dreamy", "energetic", "serene", "ominous", or "joyful" can guide the result.
        </li>
        <li>
          <strong>Combine Elements Clearly:</strong> Explicitly state how images should interact. For example, "Place the person from image 1 into the landscape of image 2."
        </li>
        <li>
          <strong>Mention Composition:</strong> Use terms like "close-up shot", "wide-angle view", or "from a low angle" to influence the perspective.
        </li>
      </ul>

      <h3 className="text-xl font-bold text-red-400 mb-4">Content Policy</h3>
      <p className="text-gray-400">
        Please be responsible and respectful. Do not create content that is harmful, hateful, harassing, or violates anyone's privacy. All generated images are subject to Google's Generative AI policies.
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline ml-1">Learn more.</a>
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
                Help & Guidelines
            </h2>
            <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Close help modal"
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
