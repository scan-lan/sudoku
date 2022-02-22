import React from "react";
import SudokuCell from "../../types/SudokuCell";
import { getBox } from "../../logic/gridLogic";
import Box from "../Box";
import "./Grid.css";

const Grid = ({
  grid,
  onCellClick,
}: {
  grid: SudokuCell[][];
  onCellClick: (cell: SudokuCell) => void;
}) => {
  return (
    <div className="grid">
      {grid.map((_, i) => (
        <Box
          cells={getBox(grid, i).map((cell) => cell)}
          onCellClick={onCellClick}
          key={i}
        />
      ))}
    </div>
  );
};

export default Grid;
