import SudokuCell, { cellPos, SudokuGrid } from "../types/SudokuCell";
import { excludeCandidatesInNakedSet } from "./excludeCandidatesInNakedSet";
import {
  getBox,
  getBoxNeighbours,
  getColumn,
  getColumnNeighbours,
  getRow,
  getRowNeighbours,
} from "./gridLogic";

export interface CellWithCandidates {
  cell: cellPos;
  candidates: number[];
}

interface CellWithValue {
  cell: cellPos;
  value: number;
}

export const solved = (grid: SudokuGrid): boolean => {
  for (let i = 0; i < 9; i++) {
    let invalidFound = [getRow, getColumn, getBox].some((getGroup) => {
      const group = getGroup(grid, i)
        .map(({ value }) => value)
        .filter((value) => value !== "");
      return new Set(group).size < 9;
    });
    if (invalidFound) return false;
  }
  return true;
};

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
  cell: SudokuCell,
  grid: SudokuGrid
): CellWithCandidates | void => {
  const candidates = cell.candidates.slice();

  const candidatesUniqueInGroup = candidates.filter(
    (candidate) =>
      !getRowNeighbours(grid, cell.row, cell.column)
        .map((rowCell) => rowCell.candidates)
        .flat()
        .includes(candidate) ||
      !getColumnNeighbours(grid, cell.column, cell.row)
        .map((columnCell) => columnCell.candidates)
        .flat()
        .includes(candidate) ||
      !getBoxNeighbours(grid, cell.box, cell)
        .map((boxCell) => boxCell.candidates)
        .flat()
        .includes(candidate)
  );
  if (candidatesUniqueInGroup.length === 1) {
    return {
      cell: {
        row: cell.row,
        column: cell.column,
      },
      candidates: candidatesUniqueInGroup,
    };
  } else {
    return excludeCandidatesInNakedSet(cell, grid);
  }
};

export const filterAllCellCandidates = (
  grid: SudokuGrid
): CellWithCandidates[] => {
  const cellsWithCandidates = [] as CellWithCandidates[];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = grid[i][j];
      const cellWithCandidates = filterCandidates(cell, grid);
      if (!cell.value && cellWithCandidates) {
        cellsWithCandidates.push(cellWithCandidates);
      }
    }
  }

  return cellsWithCandidates;
};

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
