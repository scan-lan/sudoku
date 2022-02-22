import SudokuCell, { SudokuGrid } from "../types/SudokuCell";

export const getRow = (grid: SudokuGrid, index: number): SudokuCell[] =>
  grid[index];

export const getColumn = (grid: SudokuGrid, index: number): SudokuCell[] =>
  grid.map((row) => row[index]);

export const getBox = (grid: SudokuGrid, index: number): SudokuCell[] => {
  const boxArray = [] as SudokuCell[];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let row = Math.floor(index / 3) * 3 + i;
      let col = j + (index % 3) * 3;
      boxArray.push(grid[row][col]);
    }
  }

  return boxArray;
};
