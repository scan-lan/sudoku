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
}

const Box = ({ cells, onCellClick, onCellChange }: BoxProps) => (
  <div className="box">
    {cells.map((cell, i) => {
      return (
        <Cell
          cell={cell}
          key={i}
          onCellClick={onCellClick}
          onCellChange={onCellChange}
        />
      );
    })}
  </div>
);

export default Box;
