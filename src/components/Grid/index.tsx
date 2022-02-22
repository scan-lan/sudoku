import React from "react";
import Box from "../Box";
import SudokuGrid, { SudokuCell } from "../../logic/SudokuGrid";
import "./Grid.css";

const Grid = ({
  grid,
  onCellClick,
}: {
  grid: SudokuGrid;
  onCellClick: (cell: SudokuCell) => void;
}) => {
  return (
    <div className="grid">
      {grid.rows.map((_, i) => (
        <Box
          cells={grid.box(i).map((cell) => cell)}
          onCellClick={onCellClick}
          key={i}
        />
      ))}
    </div>
  );
};

export default Grid;
