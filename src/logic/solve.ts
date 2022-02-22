import SudokuCell, { SudokuGrid } from "../types/SudokuCell";
import { getBox, getColumn, getRow } from "./gridLogic";

export const getCandidates = (
  cell: SudokuCell,
  sudokuGrid: SudokuGrid
): number[] =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
    (guess) =>
      !getColumn(sudokuGrid, cell.column)
        .map((sudokuCell) => sudokuCell.value)
        .includes(guess) &&
      !getRow(sudokuGrid, cell.row)
        .map((sudokuCell) => sudokuCell.value)
        .includes(guess) &&
      !getBox(sudokuGrid, cell.box)
        .map((sudokuCell) => sudokuCell.value)
        .includes(guess)
  );

interface CellWithCandidates {
  cell: {
    row: number;
    column: number;
  };
  candidates: number[];
}

export const getAllCellCandidates = (
  sudokuGrid: SudokuGrid
): CellWithCandidates[] => {
  const cellsWithPossibleValues = [] as CellWithCandidates[];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = sudokuGrid[i][j];
      if (!cell.value) {
        cellsWithPossibleValues.push({
          cell: {
            row: i,
            column: j,
          },
          candidates: getCandidates(cell, sudokuGrid),
        });
      }
    }
  }
  return cellsWithPossibleValues;
};

interface CellWithValue {
  cell: {
    row: number;
    column: number;
  };
  value: number;
}

export const fillSolved = (sudokuGrid: SudokuGrid): CellWithValue[] => {
  const cellsWithValues = [] as CellWithValue[];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = sudokuGrid[i][j];
      if (!cell.value && cell.candidates.length === 1) {
        cellsWithValues.push({
          cell: {
            row: i,
            column: j,
          },
          value: cell.candidates[0],
        });
      }
    }
  }

  return cellsWithValues;
};

export const solve = (grid: SudokuGrid, steps?: number) => {
  if (!steps) steps = 1;
  for (let i = 0; i < steps; i++) {}
};
