import { sudokuCell } from "./SudokuTypes";

export default interface SudokuCell {
  row: number;
  column: number;
  value: sudokuCell;
  box: number;
  candidates: number[];
}

export type SudokuGrid = SudokuCell[][];
