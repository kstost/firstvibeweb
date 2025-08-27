import React, { useCallback } from 'react';
import type { ImageFile } from '../types';
import { MAX_IMAGES, ACCEPTED_IMAGE_TYPES, MIN_IMAGES } from '../constants';
import { Icon } from './Icon';

interface ImageUploaderProps {
  images: ImageFile[];
  setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
  disabled: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages, disabled }) => {
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const newImages: ImageFile[] = Array.from(files)
        .filter(file => ACCEPTED_IMAGE_TYPES.includes(file.type))
        .map(file => ({
          id: `${file.name}-${file.lastModified}`,
          file,
          previewUrl: URL.createObjectURL(file),
        }));

      setImages(prev => {
        const combined = [...prev, ...newImages];
        if (combined.length > MAX_IMAGES) {
          alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
          return prev;
        }
        return combined;
      });
      // Reset file input value to allow re-uploading the same file
       event.target.value = '';
    },
    [setImages]
  );

  const removeImage = useCallback(
    (idToRemove: string) => {
      setImages(prev => {
         const imageToRemove = prev.find(img => img.id === idToRemove);
         if (imageToRemove) {
             URL.revokeObjectURL(imageToRemove.previewUrl);
         }
         return prev.filter(image => image.id !== idToRemove);
      });
    },
    [setImages]
  );
  
  const imageCount = images.length;
  const countColor = imageCount < MIN_IMAGES || imageCount > MAX_IMAGES ? 'text-red-400' : 'text-green-400';

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">2. 이미지 업로드</h2>
        <span className={`text-sm font-medium ${countColor}`}>{imageCount} / {MAX_IMAGES}</span>
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
          <input
            type="file"
            multiple
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={disabled || images.length >= MAX_IMAGES}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center space-y-2 cursor-pointer">
            <Icon name="upload" className="w-8 h-8 text-gray-500" />
            <span className="font-medium text-indigo-400">클릭하여 업로드</span>
            <span className="text-sm text-gray-500">또는 파일을 끌어다 놓으세요</span>
            <span className="text-xs text-gray-600">지원 형식: JPG, PNG, WEBP</span>
          </label>
        </div>
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map(image => (
              <div key={image.id} className="relative group aspect-square">
                <img
                  src={image.previewUrl}
                  alt={image.file.name}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                    aria-label="이미지 제거"
                    disabled={disabled}
                  >
                    <Icon name="close" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
