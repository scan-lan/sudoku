import { sudokuCell } from "./SudokuTypes";

export default interface SudokuCell {
  row: number;
  column: number;
  value: sudokuCell;
  box: number;
  candidates: number[];
  showCandidates: boolean;
}

export interface cellPos {
  row: number;
  column: number;
}

export type SudokuGrid = SudokuCell[][];
