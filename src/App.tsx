import React, { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Menu from "./components/Menu";
import { fillSolved, guessAll, provideCellGuesses } from "./logic/solve";
import SudokuCell from "./types/SudokuCell";

interface AppState {
  grid: SudokuCell[][];
}

const validSudokuGrid = [[], [], [], [], [], [], [], [], []] as SudokuCell[][];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    let value = j + (Math.floor(i / 3) + 1) + (i % 3) * 3;
    if (value > 9) value -= 9;

    let box;
    if (i < 3) box = Math.floor(j / 3);
    else if (i < 6) box = Math.floor(j / 3) + 3;
    else box = Math.floor(j / 3) + 6;

    validSudokuGrid[i].push({
      row: i,
      column: j,
      value: value,
      guesses: [],
      box: box,
    });
  }
}

let deleted = 0;
while (deleted < 40) {
  let row = Math.round(Math.random() * 9);
  let column = Math.round(Math.random() * 9);
  try {
    validSudokuGrid[row][column].value = null;
  } catch {
    continue;
  }
  deleted++;
}

// TODO: generalise to updateCell(setState, cell, updateObj) where
// updateObj == {guesses: []} | {value: 2} ... and the object gets spread
// in the correct place
const updateGuesses = (
  setState: (callback: (prevState: AppState) => AppState) => void,
  cell: {
    row: number;
    column: number;
  },
  cellGuesses: number[]
) => {
  setState((prevState) => ({
    grid: [
      ...prevState.grid.slice(0, cell.row),
      [
        ...prevState.grid[cell.row].slice(0, cell.column),
        {
          ...prevState.grid[cell.row][cell.column],
          guesses: cellGuesses,
        },
        ...prevState.grid[cell.row].slice(cell.column + 1),
      ],
      ...prevState.grid.slice(cell.row + 1),
    ],
  }));
};

const updateValues = (
  setState: (callback: (prevState: AppState) => AppState) => void,
  cell: {
    row: number;
    column: number;
  },
  value: number
) => {
  setState((prevState) => ({
    grid: [
      ...prevState.grid.slice(0, cell.row),
      [
        ...prevState.grid[cell.row].slice(0, cell.column),
        {
          ...prevState.grid[cell.row][cell.column],
          value: value,
          guesses: [],
        },
        ...prevState.grid[cell.row].slice(cell.column + 1),
      ],
      ...prevState.grid.slice(cell.row + 1),
    ],
  }));
};

const App = () => {
  const [state, setState] = useState<AppState>({
    grid: validSudokuGrid,
  });

  const onCellClick = (cell: SudokuCell) => {
    const cellGuesses = provideCellGuesses(cell, state.grid);
    updateGuesses(setState, cell, cellGuesses);
  };

  const onGuessAllClick = () => {
    const cellsWithGuesses = guessAll(state.grid);
    cellsWithGuesses.forEach((cellWithGuesses) => {
      updateGuesses(setState, cellWithGuesses.cell, cellWithGuesses.guesses);
    });
  };

  const onFillSolvedClick = () => {
    const cellsWithValues = fillSolved(state.grid);
    cellsWithValues.forEach((cellWithValue) => {
      updateValues(setState, cellWithValue.cell, cellWithValue.value);
    });
  };

  return (
    <div className="App">
      <Menu
        onFillSolvedClick={onFillSolvedClick}
        onGuessAllClick={onGuessAllClick}
      />
      <Grid grid={state.grid} onCellClick={onCellClick} />
    </div>
  );
};

export default App;
