
export type CellValue = number | null;
export type BoardState = CellValue[][];
export type BlockShape = number[][];

export interface Block {
  id: number;
  shape: BlockShape;
  color: string;
}
