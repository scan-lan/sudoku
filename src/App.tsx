import React, { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Menu from "./components/Menu";
import {
  fillSolved,
  filterAllCellCandidates,
  filterCandidates,
  getAllCellCandidates,
  getCandidates,
} from "./logic/solve";
import SudokuCell from "./types/SudokuCell";

interface AppState {
  grid: SudokuCell[][];
}

const grid = [
  [null, 5, 8, 7, null, null, null, null, 4],
  [6, null, null, 3, 5, null, null, 9, 7],
  [null, null, null, null, null, null, 5, null, 6],
  [null, null, null, null, 2, null, null, null, null],
  [5, null, 7, null, null, null, 4, null, 9],
  [null, null, null, null, 7, null, null, null, null],
  [2, null, 5, null, null, null, null, null, null],
  [1, 6, null, null, 4, 2, null, null, 5],
  [3, null, null, null, null, 5, 8, 6, null],
] as (null | number)[][];

const validSudokuGrid = [[], [], [], [], [], [], [], [], []] as SudokuCell[][];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    // let value = j + (Math.floor(i / 3) + 1) + (i % 3) * 3;
    // if (value > 9) value -= 9;
    let value = grid[i][j];

    let box;
    if (i < 3) box = Math.floor(j / 3);
    else if (i < 6) box = Math.floor(j / 3) + 3;
    else box = Math.floor(j / 3) + 6;

    validSudokuGrid[i].push({
      row: i,
      column: j,
      value: value,
      candidates: [],
      box: box,
    });
  }
}

// let deleted = 0;
// while (deleted < 60) {
//   let row = Math.round(Math.random() * 9);
//   let column = Math.round(Math.random() * 9);
//   try {
//     validSudokuGrid[row][column].value = null;
//   } catch {
//     continue;
//   }
//   deleted++;
// }

// TODO: generalise to updateCell(setState, cell, updateObj) where
// updateObj == {guesses: []} | {value: 2} ... and the object gets spread
// in the correct place
const updateCellCandidates = (
  setState: (callback: (prevState: AppState) => AppState) => void,
  cell: {
    row: number;
    column: number;
  },
  cellCandidates: number[]
) => {
  setState((prevState) => ({
    grid: [
      ...prevState.grid.slice(0, cell.row),
      [
        ...prevState.grid[cell.row].slice(0, cell.column),
        {
          ...prevState.grid[cell.row][cell.column],
          candidates: cellCandidates,
        },
        ...prevState.grid[cell.row].slice(cell.column + 1),
      ],
      ...prevState.grid.slice(cell.row + 1),
    ],
  }));
};

const updateCellValue = (
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
          candidates: [],
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
    if (!cell.value) {
      if (cell.candidates.length === 1) {
        updateCellValue(setState, cell, cell.candidates[0]);
      } else if (!cell.candidates) {
        const cellCandidates = getCandidates(cell, state.grid);
        updateCellCandidates(setState, cell, cellCandidates);
      } else {
        console.log(filterCandidates(state.grid, cell));
      }
    }
  };

  const onGetCandidatesClick = () => {
    const cellsWithCandidates = getAllCellCandidates(state.grid);
    cellsWithCandidates.forEach((cellWithCandidates) => {
      updateCellCandidates(
        setState,
        cellWithCandidates.cell,
        cellWithCandidates.candidates
      );
    });
  };

  const onFillSolvedClick = () => {
    const cellsWithValues = fillSolved(state.grid);
    cellsWithValues.forEach((cellWithValue) => {
      updateCellValue(setState, cellWithValue.cell, cellWithValue.value);
    });
  };

  const onFilterCandidatesClick = () => {
    const cellsWithCandidates = filterAllCellCandidates(state.grid);
    cellsWithCandidates.forEach((cellWithCandidates) => {
      updateCellCandidates(
        setState,
        cellWithCandidates.cell,
        cellWithCandidates.candidates
      );
    });
  };

  return (
    <div className="App">
      <Menu
        onFillSolvedClick={onFillSolvedClick}
        onGetAllCandidatesClick={onGetCandidatesClick}
        onFilterCandidatesClick={onFilterCandidatesClick}
      />
      <Grid grid={state.grid} onCellClick={onCellClick} />
    </div>
  );
};

export default App;
