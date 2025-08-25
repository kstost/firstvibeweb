
import { useState, useEffect, useCallback } from 'react';
import { BoardState, Block, BlockShape } from '../types';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  GAME_TIMER_SECONDS,
  STANDARD_BLOCKS,
  BLOCK_COLORS,
  SCORE_PER_BLOCK,
  SCORE_PER_LINE,
  COMBO_MULTIPLIER
} from '../constants';

const createEmptyBoard = (): BoardState =>
  Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));

const isValidPlacement = (
    board: BoardState,
    shape: BlockShape,
    row: number,
    col: number
): boolean => {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const boardRow = row + r;
        const boardCol = col + c;
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

const canPlaceAnyBlock = (board: BoardState, blocks: Block[]): boolean => {
    if (blocks.length === 0) return true;
    for (const block of blocks) {
        for (let r = 0; r < BOARD_HEIGHT; r++) {
            for (let c = 0; c < BOARD_WIDTH; c++) {
                if (isValidPlacement(board, block.shape, r, c)) {
                    return true;
                }
            }
        }
    }
    return false;
};


export const useGameLogic = () => {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard());
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIMER_SECONDS);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generateNewBlocks = useCallback(() => {
    const newBlocks: Block[] = [];
    for (let i = 0; i < 3; i++) {
      const shape = STANDARD_BLOCKS[Math.floor(Math.random() * STANDARD_BLOCKS.length)];
      const color = BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)];
      newBlocks.push({ id: Date.now() + i, shape, color });
    }
    setBlocks(newBlocks);
  }, []);

  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setTimeLeft(GAME_TIMER_SECONDS);
    setIsGameOver(false);
    setGameStarted(true);
    generateNewBlocks();
  }, [generateNewBlocks]);

  useEffect(() => {
    setHighScore(parseInt(localStorage.getItem('blockGameHighScore') || '0', 10));
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!gameStarted || isGameOver) return;
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver, gameStarted]);
  
  useEffect(() => {
    if (gameStarted && !isGameOver && !canPlaceAnyBlock(board, blocks)) {
        setIsGameOver(true);
    }
  }, [board, blocks, gameStarted, isGameOver]);


  useEffect(() => {
    if (isGameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem('blockGameHighScore', score.toString());
    }
  }, [isGameOver, score, highScore]);

  const addCreativeBlock = useCallback((shape: BlockShape) => {
    const color = BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)];
    const newBlock = { id: Date.now(), shape, color };
    setBlocks(prev => [...prev, newBlock]);
  }, []);
  
  const placeBlock = useCallback((
    block: Block,
    row: number,
    col: number
  ): boolean => {
    if (isGameOver || !isValidPlacement(board, block.shape, row, col)) {
      return false;
    }

    const newBoard = board.map(r => [...r]);
    const colorIndex = BLOCK_COLORS.indexOf(block.color) + 1;

    block.shape.forEach((r, rIndex) => {
      r.forEach((cell, cIndex) => {
        if (cell) {
          newBoard[row + rIndex][col + cIndex] = colorIndex;
        }
      });
    });

    // Line clearing
    const linesToClear: number[] = [];
    for (let r = 0; r < BOARD_HEIGHT; r++) {
      if (newBoard[r].every(cell => cell !== null)) {
        linesToClear.push(r);
      }
    }

    if (linesToClear.length > 0) {
      linesToClear.forEach(r => {
        newBoard.splice(r, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(null));
      });
    }

    setBoard(newBoard);

    // Scoring
    const blockPoints = block.shape.flat().reduce((sum, cell) => sum + (cell ? 1 : 0), 0) * SCORE_PER_BLOCK / 2;
    const linePoints = linesToClear.length * SCORE_PER_LINE * (linesToClear.length > 1 ? COMBO_MULTIPLIER * linesToClear.length : 1);
    setScore(prev => prev + blockPoints + linePoints);

    const remainingBlocks = blocks.filter(b => b.id !== block.id);
    if (remainingBlocks.length === 0) {
        setTimeout(generateNewBlocks, 100);
    } else {
        setBlocks(remainingBlocks);
    }
    
    return true;
  }, [board, blocks, isGameOver, generateNewBlocks]);

  return {
    board,
    blocks,
    score,
    highScore,
    timeLeft,
    isGameOver,
    gameStarted,
    startGame,
    placeBlock,
    addCreativeBlock
  };
};
