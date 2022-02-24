import React from "react";
import SudokuCell, { cellPos } from "../../types/SudokuCell";
import { getBox } from "../../logic/gridLogic";
import Box from "../Box";
import "./Grid.css";

interface GridProps {
  grid: SudokuCell[][];
  onCellClick: (cell: SudokuCell) => void;
  onCellChange: (
    cellPos: cellPos
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  solved: boolean;
}

const Grid = ({ grid, onCellClick, onCellChange, solved }: GridProps) => {
  return (
    <div className="grid">
      {grid.map((_, i) => (
        <Box
          cells={getBox(grid, i).map((cell) => cell)}
          onCellClick={onCellClick}
          onCellChange={onCellChange}
          key={i}
          solved={solved}
        />
      ))}
    </div>
  );
};

export default Grid;
