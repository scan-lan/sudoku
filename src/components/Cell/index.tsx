import React from "react";
import SudokuCell, { cellPos } from "../../types/SudokuCell";
import "./Cell.css";

interface CellProps {
  cell: SudokuCell;
  onCellClick: (cell: SudokuCell) => void;
  onCellChange: (
    cellPos: cellPos
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  solved: boolean;
}

const Cell = ({ cell, onCellClick, onCellChange, solved }: CellProps) => {
  const bgc = solved ? "#ddffdd" : "white";
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
        backgroundColor:
          cell.candidates.length === 1 && cell.showCandidates ? "green" : bgc,
      }}
    >
      {cell.showCandidates ? (
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
      ) : (
        <input
          className="value"
          type="number"
          min={1}
          max={9}
          value={cell.value}
          onChange={onCellChange({ row: cell.row, column: cell.column })}
        ></input>
      )}
    </div>
  );
};

export default Cell;
