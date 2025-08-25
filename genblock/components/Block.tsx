import React from 'react';
import { Block as BlockType } from '../types';

interface BlockProps {
  block: BlockType;
  onDragStart: (e: React.DragEvent, block: BlockType) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

export const Block = ({ block, onDragStart, onDragEnd }: BlockProps): React.ReactNode => {
  const { shape, color } = block;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, block)}
      onDragEnd={onDragEnd}
      className="p-2 cursor-grab active:cursor-grabbing"
    >
      <div className="flex flex-col gap-1">
        {shape.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-5 h-5 rounded-sm ${
                  cell ? color : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};