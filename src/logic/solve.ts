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

interface CellWithGuesses {
  cell: {
    row: number;
    column: number;
  };
  guesses: number[];
}

const guessAll = (sudokuGrid: SudokuGrid): CellWithGuesses[] => {
  const cellsWithGuesses = [] as CellWithGuesses[];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = sudokuGrid.cellAt([i, j]);
      if (!cell.value) {
        cellsWithGuesses.push({
          cell: {
            row: i,
            column: j,
          },
          guesses: provideCellGuesses(cell, sudokuGrid),
        });
      }
    }
  }
  return cellsWithGuesses;
};

interface CellWithValue {
  cell: {
    row: number;
    column: number;
  };
  value: number;
}

const fillSolved = (sudokuGrid: SudokuGrid): CellWithValue[] => {
  const cellsWithValues = [] as CellWithValue[];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = sudokuGrid.cellAt([i, j]);
      if (!cell.value && cell.guesses.length === 1) {
        cellsWithValues.push({
          cell: {
            row: i,
            column: j,
          },
          value: cell.guesses[0],
        });
      }
    }
  }

  return cellsWithValues;
};

const solve = (grid: SudokuGrid, steps?: number) => {
  if (!steps) steps = 1;
  for (let i = 0; i < steps; i++) {}
};

export { solve, provideCellGuesses, guessAll, fillSolved };
