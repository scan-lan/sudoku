import SudokuCell, { SudokuGrid } from "../types/SudokuCell";
import {
  getBox,
  getBoxExcludingSelf,
  getColumn,
  getColumnExcludingSelf,
  getRow,
  getRowExcludingSelf,
} from "./gridLogic";

export const getCandidates = (
  cell: SudokuCell,
  sudokuGrid: SudokuGrid
): number[] =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
    (candidate) =>
      !getColumn(sudokuGrid, cell.column)
        .map((sudokuCell) => sudokuCell.value)
        .includes(candidate) &&
      !getRow(sudokuGrid, cell.row)
        .map((sudokuCell) => sudokuCell.value)
        .includes(candidate) &&
      !getBox(sudokuGrid, cell.box)
        .map((sudokuCell) => sudokuCell.value)
        .includes(candidate)
  );

export const filterCandidates = (
  grid: SudokuGrid,
  cell: SudokuCell
): CellWithCandidates | void => {
  const candidates = cell.candidates.slice();
  const candidatesUniqueInGroup = candidates.filter(
    (candidate) =>
      !getRowExcludingSelf(grid, cell.row, cell.column)
        .map((rowCell) => rowCell.candidates)
        .flat()
        .includes(candidate) ||
      !getColumnExcludingSelf(grid, cell.column, cell.row)
        .map((columnCell) => columnCell.candidates)
        .flat()
        .includes(candidate) ||
      !getBoxExcludingSelf(grid, cell.box, cell)
        .map((boxCell) => boxCell.candidates)
        .flat()
        .includes(candidate)
  );
  if (candidatesUniqueInGroup.length === 1)
    return {
      cell: {
        row: cell.row,
        column: cell.column,
      },
      candidates: candidatesUniqueInGroup,
    };
};

export const filterAllCellCandidates = (
  grid: SudokuGrid
): CellWithCandidates[] => {
  const cellsWithCandidates = [] as CellWithCandidates[];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = grid[i][j];
      const cellWithCandidates = filterCandidates(grid, cell);
      if (!cell.value && cellWithCandidates) {
        cellsWithCandidates.push(cellWithCandidates);
      }
    }
  }

  return cellsWithCandidates;
};

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
  const cellsWithCandidates = [] as CellWithCandidates[];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = sudokuGrid[i][j];
      if (!cell.value) {
        cellsWithCandidates.push({
          cell: {
            row: i,
            column: j,
          },
          candidates: getCandidates(cell, sudokuGrid),
        });
      }
    }
  }
  return cellsWithCandidates;
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
