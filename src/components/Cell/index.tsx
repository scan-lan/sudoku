import React from "react";
import SudokuCell from "../../types/SudokuCell";
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
        backgroundColor: cell.candidates.length === 1 ? "green" : "white",
      }}
    >
      {cell.value ? (
        <div className="value">{cell.value}</div>
      ) : (
        <div className="candidates">
          {cell.candidates.map((candidate, i) => (
            <div
              className="candidate"
              key={i}
              style={{
                color: cell.candidates.length === 1 ? "white" : "#555",
                fontWeight: cell.candidates.length === 1 ? 800 : 500,
              }}
            >
              {candidate}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cell;
