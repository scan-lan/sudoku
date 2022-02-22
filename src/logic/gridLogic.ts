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

export const getRowExcludingSelf = (
  grid: SudokuGrid,
  index: number,
  column: number
) => {
  const row = getRow(grid, index);
  return row.slice(0, column).concat(row.slice(column + 1));
};

export const getColumnExcludingSelf = (
  grid: SudokuGrid,
  index: number,
  row: number
) => {
  const column = getColumn(grid, index);
  return column.slice(0, row).concat(column.slice(row + 1));
};

export const getBoxExcludingSelf = (
  grid: SudokuGrid,
  index: number,
  cell: SudokuCell
) => {
  const box = getBox(grid, index);
  const cellIndex = box.indexOf(cell);
  return box.slice(0, cellIndex).concat(box.slice(cellIndex + 1));
};
