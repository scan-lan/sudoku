import React, { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Menu from "./components/Menu";
import {
  fillSolved,
  filterAllCellCandidates,
  getAllCellCandidates,
} from "./logic/solve";
import SudokuCell from "./types/SudokuCell";

interface AppState {
  grid: SudokuCell[][];
  filterCandidatesDisabled: boolean;
}

// const grid = [
//   [null, 5, 8, 7, null, null, null, null, 4],
//   [6, null, null, 3, 5, null, null, 9, 7],
//   [null, null, null, null, null, null, 5, null, 6],
//   [null, null, null, null, 2, null, null, null, null],
//   [5, null, 7, null, null, null, 4, null, 9],
//   [null, null, null, null, 7, null, null, null, null],
//   [2, null, 5, null, null, null, null, null, null],
//   [1, 6, null, null, 4, 2, null, null, 5],
//   [3, null, null, null, null, 5, 8, 6, null],
// ] as (null | number)[][];

const validSudokuGrid = [[], [], [], [], [], [], [], [], []] as SudokuCell[][];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    let value = j + (Math.floor(i / 3) + 1) + (i % 3) * 3;
    if (value > 9) value -= 9;
    // let value = grid[i][j];

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

let deleted = 0;
while (deleted < 60) {
  let row = Math.round(Math.random() * 9);
  let column = Math.round(Math.random() * 9);
  try {
    validSudokuGrid[row][column].value = null;
  } catch {
    continue;
  }
  deleted++;
}

const updateCell = (
  setState: (callback: (prevState: AppState) => AppState) => void,
  cell: {
    row: number;
    column: number;
  },
  updateObject: { candidates: number[] } | { value: number },
  filterButtonDisabled: boolean
) => {
  setState((prevState) => ({
    grid: [
      ...prevState.grid.slice(0, cell.row),
      [
        ...prevState.grid[cell.row].slice(0, cell.column),
        {
          ...prevState.grid[cell.row][cell.column],
          updateObject,
        },
        ...prevState.grid[cell.row].slice(cell.column + 1),
      ],
      ...prevState.grid.slice(cell.row + 1),
    ],
    filterCandidatesDisabled: filterButtonDisabled,
  }));
};

const App = () => {
  const [state, setState] = useState<AppState>({
    grid: validSudokuGrid,
    filterCandidatesDisabled: true,
  });

  const onCellClick = (clickedCell: SudokuCell) => {
    if (!clickedCell.value) {
      if (clickedCell.candidates.length === 1) {
        updateCell(
          setState,
          clickedCell,
          { value: clickedCell.candidates[0] },
          false
        );
      }
    }
  };

  const onGetCandidatesClick = () => {
    const cellsWithCandidates = getAllCellCandidates(state.grid);
    cellsWithCandidates.forEach(({ cell, candidates }) => {
      updateCell(setState, cell, { candidates: candidates }, false);
    });
  };

  const onFilterCandidatesClick = () => {
    const cellsWithCandidates = filterAllCellCandidates(state.grid);
    cellsWithCandidates.forEach(({ cell, candidates }) => {
      updateCell(setState, cell, { candidates: candidates }, true);
    });
  };

  const onFillSolvedClick = () => {
    const cellsWithValues = fillSolved(state.grid);
    cellsWithValues.forEach(({ cell, value }) => {
      updateCell(setState, cell, { value: value }, false);
    });
  };

  return (
    <div className="App">
      <Menu
        onFillSolvedClick={onFillSolvedClick}
        onGetAllCandidatesClick={onGetCandidatesClick}
        onFilterCandidatesClick={onFilterCandidatesClick}
        filterCandidatesActive={state.filterCandidatesDisabled}
      />
      <Grid grid={state.grid} onCellClick={onCellClick} />
    </div>
  );
};

export default App;
