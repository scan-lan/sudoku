import { sudokuCell } from "./SudokuTypes";

export default interface SudokuCell {
  row: number;
  column: number;
  value: sudokuCell;
  box: number;
  guesses: number[];
}

export type SudokuGrid = SudokuCell[][];
