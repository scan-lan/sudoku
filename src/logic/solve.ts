import SudokuGrid, { SudokuCell } from "./SudokuGrid";

const provideCellGuesses = (
  cell: SudokuCell,
  sudokuGrid: SudokuGrid
): number[] =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
    (guess) =>
      !sudokuGrid
        .column(cell.column)
        .map((sudokuCell) => sudokuCell.value)
        .includes(guess) &&
      !sudokuGrid
        .row(cell.row)
        .map((sudokuCell) => sudokuCell.value)
        .includes(guess) &&
      !sudokuGrid
        .box(cell.box)
        .map((sudokuCell) => sudokuCell.value)
        .includes(guess)
  );

const solve = (grid: SudokuGrid, steps?: number) => {
  if (!steps) steps = 1;
  for (let i = 0; i < steps; i++) {}
};

export { solve, provideCellGuesses };
