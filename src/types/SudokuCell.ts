import { sudokuCellValue } from "./SudokuTypes";

export default interface SudokuCell {
  row: number;
  column: number;
  value: sudokuCellValue;
  box: number;
  candidates: sudokuCellValue[];
  showCandidates: boolean;
}

export interface cellPos {
  row: number;
  column: number;
}

export type SudokuGrid = SudokuCell[][];
