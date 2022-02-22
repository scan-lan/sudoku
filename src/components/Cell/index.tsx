import React from "react";
import { SudokuCell } from "../../logic/SudokuGrid";
import { coordinate } from "../../types/SudokuTypes";
import "./Cell.css";

interface CellProps {
  cell: SudokuCell;
  onCellClick: (cell: SudokuCell) => void;
  boxPosition?: coordinate;
  gridPosition?: coordinate;
}

const Cell = ({ cell, onCellClick }: CellProps) => {
  return (
    <div
      className="cell"
      onClick={() => {
        onCellClick(cell);
      }}
      style={{
        borderRight: [2, 5, 8].includes(cell.column)
          ? "none"
          : "1px dashed #888",
        borderBottom: [2, 5, 8].includes(cell.row) ? "none" : "1px dashed #888",
      }}
    >
      {cell.value ? (
        <div className="value">{cell.value}</div>
      ) : (
        <div className="guesses">
          {cell.guesses.map((guess, i) => (
            <div
              className="guess"
              key={i}
              style={{
                color: cell.guesses.length === 1 ? "green" : "#555",
                fontWeight: cell.guesses.length === 1 ? 800 : 500,
              }}
            >
              {guess}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cell;
