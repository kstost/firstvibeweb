
import { BlockShape } from './types';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 10;
export const GAME_TIMER_SECONDS = 1800; // 30 minutes

export const SCORE_PER_BLOCK = 10;
export const SCORE_PER_LINE = 100;
export const COMBO_MULTIPLIER = 1.5;

export const BLOCK_COLORS: string[] = [
  'bg-cyan-500',
  'bg-blue-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-pink-500',
  'bg-indigo-500',
];

export const STANDARD_BLOCKS: BlockShape[] = [
  // O
  [[1, 1], [1, 1]],
  // I
  [[1, 1, 1, 1]],
  [[1], [1], [1], [1]],
  // L
  [[1, 0], [1, 0], [1, 1]],
  // J
  [[0, 1], [0, 1], [1, 1]],
  // T
  [[1, 1, 1], [0, 1, 0]],
  // S
  [[0, 1, 1], [1, 1, 0]],
  // Z
  [[1, 1, 0], [0, 1, 1]],
  // Small L
  [[1, 1], [1, 0]],
  // Dot
  [[1]],
  // Small Line
  [[1, 1, 1]],
];
