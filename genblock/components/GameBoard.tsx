import React, { useState } from 'react';
import { BoardState, Block, BlockShape } from '../types';
import { BLOCK_COLORS, BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

interface GameBoardProps {
  board: BoardState;
  onDrop: (row: number, col: number) => void;
  draggedBlock: Block | null;
}

const isValid = (
    shape: BlockShape,
    row: number,
    col: number,
    board: BoardState
) => {
    for (let r_offset = 0; r_offset < shape.length; r_offset++) {
        for (let c_offset = 0; c_offset < shape[r_offset].length; c_offset++) {
            if (shape[r_offset][c_offset]) {
                const boardRow = row + r_offset;
                const boardCol = col + c_offset;
                if (
                    boardRow >= BOARD_HEIGHT ||
                    boardCol >= BOARD_WIDTH ||
                    boardRow < 0 ||
                    boardCol < 0 ||
                    board[boardRow][boardCol] !== null
                ) {
                    return false;
                }
            }
        }
    }
    return true;
};


export const GameBoard = ({ board, onDrop, draggedBlock }: GameBoardProps): React.ReactNode => {
  const [dragOverCell, setDragOverCell] = useState<{ row: number; col: number } | null>(null);

  const handleDragOver = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    setDragOverCell({ row, col });
  };

  const handleDrop = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    onDrop(row, col);
    setDragOverCell(null);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    setDragOverCell(null);
  };

  const renderCells = () => {
    const displayBoard = board.map(r => [...r]);
    let canPlace = false;
    
    if (draggedBlock && dragOverCell) {
        canPlace = isValid(draggedBlock.shape, dragOverCell.row, dragOverCell.col, board);
        if (canPlace) {
             draggedBlock.shape.forEach((r, rIndex) => {
                r.forEach((cell, cIndex) => {
                    if (cell) {
                        const row = dragOverCell.row + rIndex;
                        const col = dragOverCell.col + cIndex;
                        if(row < BOARD_HEIGHT && col < BOARD_WIDTH) {
                            displayBoard[row][col] = -1; // Ghost block indicator
                        }
                    }
                });
            });
        }
    }

    return displayBoard.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const isGhost = cell === -1;
        
        let cellColor: string;
        if (isGhost && canPlace && draggedBlock) {
            const colorString = draggedBlock.color;
            const parts = colorString.split('-');
            if (parts.length === 3) {
                const [prefix, color, shade] = parts;
                const brighterShade = Math.max(100, parseInt(shade) - 200);
                cellColor = `${prefix}-${color}-${brighterShade} opacity-75`;
            } else {
                cellColor = 'bg-slate-400/50'; // Fallback for unexpected color format
            }
        } else if (cell) {
            cellColor = `${BLOCK_COLORS[cell - 1]}`;
        } else {
            cellColor = 'bg-slate-800';
        }
        
        return (
            <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-full h-full aspect-square rounded-sm transition-colors duration-100 ${cellColor}`}
                onDragOver={(e) => handleDragOver(e, rowIndex, colIndex)}
                onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                onDragLeave={handleDragLeave}
            />
        );
      })
    );
  };

  return (
    <div
      className="grid grid-cols-10 gap-1 p-2 bg-slate-700 rounded-lg aspect-square"
    >
      {renderCells()}
    </div>
  );
};