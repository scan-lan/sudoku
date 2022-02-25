import React, { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Menu from "./components/Menu";
import {
  fillSolved,
  filterAllCellCandidates,
  getAllCellCandidates,
  solved,
} from "./logic/solve";
import SudokuCell, { cellPos } from "./types/SudokuCell";
import { sudokuCell } from "./types/SudokuTypes";

const grid = [
  ["", 5, 8, 7, "", "", "", "", 4],
  [6, "", "", 3, 5, "", "", 9, 7],
  ["", "", "", "", "", "", 5, "", 6],
  ["", "", "", "", 2, "", "", "", ""],
  [5, "", 7, "", "", "", 4, "", 9],
  ["", "", "", "", 7, "", "", "", ""],
  [2, "", 5, "", "", "", "", "", ""],
  [1, 6, "", "", 4, 2, "", "", 5],
  [3, "", "", "", "", 5, 8, 6, ""],
] as ("" | number)[][];

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
      showCandidates: false,
    });
  }
}

// let deleted = 0;
// while (deleted < 50) {
//   let row = Math.round(Math.random() * 9);
//   let column = Math.round(Math.random() * 9);
//   try {
//     validSudokuGrid[row][column].value = "";
//   } catch {
//     continue;
//   }
//   deleted++;
// }

interface NewCell {
  candidates?: number[];
  value?: sudokuCell;
  showCandidates?: boolean;
}

const updateCell = (
  setState: (callback: (prevState: AppState) => AppState) => void,
  cell: cellPos,
  newCell: NewCell,
  filterButtonDisabled?: boolean
) => {
  setState((prevState) => ({
    ...prevState,
    grid: [
      ...prevState.grid.slice(0, cell.row),
      [
        ...prevState.grid[cell.row].slice(0, cell.column),
        {
          ...prevState.grid[cell.row][cell.column],
          ...newCell,
        },
        ...prevState.grid[cell.row].slice(cell.column + 1),
      ],
      ...prevState.grid.slice(cell.row + 1),
    ],
    filterCandidatesDisabled:
      filterButtonDisabled === undefined
        ? prevState.filterCandidatesDisabled
        : filterButtonDisabled,
  }));
};

interface AppState {
  grid: SudokuCell[][];
  filterCandidatesDisabled: boolean;
  solved: boolean;
}

const App = () => {
  const [state, setState] = useState<AppState>({
    grid: validSudokuGrid,
    filterCandidatesDisabled: true,
    solved: false,
  });
  const [history, setHistory] = useState<SudokuCell[][][]>([state.grid]);

  const onCellClick = (clickedCell: SudokuCell) => {
    if (!clickedCell.value) {
      updateCell(setState, clickedCell, { showCandidates: false });
    }
  };

  const onCellChange =
    (cell: cellPos) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let newCellValue = parseInt(event.currentTarget.value);
      updateCell(setState, cell, {
        value: isNaN(newCellValue) ? "" : newCellValue,
      });
    };

  const onGetCandidatesClick = () => {
    const cellsWithCandidates = getAllCellCandidates(state.grid);
    cellsWithCandidates.forEach(({ cell, candidates }) => {
      updateCell(
        setState,
        cell,
        { candidates: candidates, showCandidates: true },
        false
      );
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
      updateCell(
        setState,
        cell,
        { value: value, candidates: [], showCandidates: false },
        false
      );
    });
  };

  const onClearClick = () => {
    state.grid.flat().forEach(({ row, column }) => {
      updateCell(
        setState,
        { row, column },
        { value: "", candidates: [], showCandidates: false }
      );
    });
  };

  const onUndoClick = () => {
    history.pop();
    const lastState = history.pop();
    if (lastState !== undefined) {
      console.log(lastState);
      setState((prevState) => ({ ...prevState, grid: lastState }));
    }
  };

  useEffect(() => {
    setHistory((prevHistory) => {
      console.log("adding");

      if (prevHistory.length > 100) prevHistory.shift();
      return [...prevHistory, state.grid];
    });
    if (solved(state.grid)) {
      setState((prevState) => ({ ...prevState, solved: true }));
    } else {
      setState((prevState) => ({ ...prevState, solved: false }));
    }
  }, [state.grid]);

  return (
    <div className="App">
      <Menu
        onFillSolvedClick={onFillSolvedClick}
        onGetAllCandidatesClick={onGetCandidatesClick}
        onFilterCandidatesClick={onFilterCandidatesClick}
        onClearClick={onClearClick}
        onUndoClick={onUndoClick}
        filterCandidatesActive={state.filterCandidatesDisabled}
      />
      <Grid
        grid={state.grid}
        onCellClick={onCellClick}
        onCellChange={onCellChange}
        solved={state.solved}
      />
    </div>
  );
};

export default App;
