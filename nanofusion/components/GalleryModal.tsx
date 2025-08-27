
import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';
import type { StoredImage } from '../types';
import * as dbService from '../services/dbService';

interface GalleryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLoad: (image: StoredImage) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isVisible, onClose, onLoad }) => {
  const [images, setImages] = useState<StoredImage[]>([]);

  const fetchImages = async () => {
    try {
      const storedImages = await dbService.getAllImages();
      setImages(storedImages);
    } catch (error) {
      console.error("Failed to load images from gallery:", error);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchImages();
    }
  }, [isVisible]);

  const handleDelete = async (id: number) => {
    if (confirm('정말로 이 이미지를 삭제하시겠습니까?')) {
      try {
        await dbService.deleteImage(id);
        setImages(prevImages => prevImages.filter(image => image.id !== id));
      } catch (error) {
        console.error("Failed to delete image:", error);
        alert('이미지 삭제에 실패했습니다.');
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
    >
      <div
        className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-4xl h-full flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 id="gallery-modal-title" className="text-2xl font-bold flex items-center">
            <Icon name="gallery" className="w-7 h-7 mr-3 text-gray-400"/>
            갤러리
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            aria-label="갤러리 닫기"
          >
            <Icon name="close" className="w-6 h-6" />
          </button>
        </div>
        <div className="border-t border-gray-700 pt-4 flex-grow overflow-y-auto">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map(image => (
                <div key={image.id} className="relative group aspect-square bg-gray-900 rounded-md overflow-hidden">
                  <img
                    src={`data:${image.mimeType};base64,${image.base64}`}
                    alt={`Generated on ${new Date(image.createdAt).toLocaleString()}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 space-y-2 text-center">
                    <p className="text-xs text-gray-300 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }} title={image.prompt}>{image.prompt}</p>
                    <div className="flex space-x-2">
                         <button
                            onClick={() => onLoad(image)}
                            className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-500 transition-colors"
                            aria-label="이미지 불러오기"
                         >
                           <Icon name="upload" className="w-4 h-4 mr-1"/>
                           불러오기
                         </button>
                         <button
                            onClick={() => handleDelete(image.id!)}
                            className="p-2 bg-red-600/80 text-white rounded-full hover:bg-red-500 transition-colors"
                            aria-label="이미지 삭제"
                         >
                           <Icon name="close" className="w-4 h-4"/>
                         </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <Icon name="image" className="w-16 h-16 mb-4"/>
              <h3 className="text-xl font-semibold">갤러리가 비어있습니다</h3>
              <p className="mt-2">이미지를 생성하면 여기에 자동으로 저장됩니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
