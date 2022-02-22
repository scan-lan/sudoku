import React from "react";
import Cell from "../Cell";
import SudokuCell from "../../types/SudokuCell";
import "./Box.css";

interface BoxProps {
  cells: SudokuCell[];
  onCellClick: (cell: SudokuCell) => void;
}

const Box = ({ cells, onCellClick }: BoxProps) => (
  <div className="box">
    {cells.map((cell, i) => {
      return <Cell cell={cell} key={i} onCellClick={onCellClick} />;
    })}
  </div>
);

export default Box;
