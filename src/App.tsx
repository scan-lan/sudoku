import React, { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Menu from "./components/Menu";
import { fillSolved, guessAll, provideCellGuesses } from "./logic/solve";
import SudokuGrid, { SudokuCell } from "./logic/SudokuGrid";
import CellInfo from "./types/CellInfo";

interface AppState {
  grid: CellInfo[][];
}

const validSudokuGrid = [[], [], [], [], [], [], [], [], []] as CellInfo[][];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    let value = j + (Math.floor(i / 3) + 1) + (i % 3) * 3;
    if (value > 9) value -= 9;
    validSudokuGrid[i].push({ value: value, guesses: [] });
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
          value: prevState.grid[cell.row][cell.column].value,
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

  const gridInstance = new SudokuGrid(state.grid);

  const onCellClick = (cell: SudokuCell) => {
    const cellGuesses = provideCellGuesses(cell, gridInstance);
    updateGuesses(setState, cell, cellGuesses);
  };

  const onGuessAllClick = () => {
    const cellsWithGuesses = guessAll(gridInstance);
    cellsWithGuesses.forEach((cellWithGuesses) => {
      updateGuesses(setState, cellWithGuesses.cell, cellWithGuesses.guesses);
    });
  };

  const onFillSolvedClick = () => {
    const cellsWithValues = fillSolved(gridInstance);
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
      <Grid grid={gridInstance} onCellClick={onCellClick} />
    </div>
  );
};

export default App;
