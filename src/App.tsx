import React, { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import { provideCellGuesses } from "./logic/solve";
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
while (deleted < 30) {
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
  cell: SudokuCell,
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

const App = () => {
  const [state, setState] = useState<AppState>({
    grid: validSudokuGrid,
  });

  const gridInstance = new SudokuGrid(state.grid);

  const onCellClick = (cell: SudokuCell) => {
    const cellGuesses = provideCellGuesses(cell, gridInstance);
    updateGuesses(setState, cell, cellGuesses);
  };

  console.log(gridInstance);

  return (
    <div className="App">
      <Grid grid={gridInstance} onCellClick={onCellClick} />
    </div>
  );
};

export default App;
