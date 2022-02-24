import React from "react";
import Cell from "../Cell";
import SudokuCell, { cellPos } from "../../types/SudokuCell";
import "./Box.css";

interface BoxProps {
  cells: SudokuCell[];
  onCellClick: (cell: SudokuCell) => void;
  onCellChange: (
    cellPos: cellPos
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  solved: boolean;
}

const Box = ({ cells, onCellClick, onCellChange, solved }: BoxProps) => (
  <div
    className="box"
    style={{
      borderColor: solved ? "green" : "#333",
    }}
  >
    {cells.map((cell, i) => {
      return (
        <Cell
          cell={cell}
          key={i}
          onCellClick={onCellClick}
          onCellChange={onCellChange}
          solved={solved}
        />
      );
    })}
  </div>
);

export default Box;
