import React from "react";
import "./Menu.css";

interface MenuProps {
  onGetAllCandidatesClick: () => void;
  onFilterCandidatesClick: () => void;
  onFillSolvedClick: () => void;
  onClearClick: () => void;
  onUndoClick: () => void;
  filterCandidatesActive: boolean;
}

const Menu = ({
  onGetAllCandidatesClick,
  onFilterCandidatesClick,
  onFillSolvedClick,
  onClearClick,
  onUndoClick,
  filterCandidatesActive,
}: MenuProps) => (
  <div className="menu">
    <button onClick={onGetAllCandidatesClick}>Get candidates</button>
    <button disabled={false} onClick={onFilterCandidatesClick}>
      Filter candidates
    </button>
    <button onClick={onFillSolvedClick}>Fill solved</button>
    <button onClick={onClearClick}>Clear grid</button>
    <button onClick={onUndoClick}>Undo</button>
  </div>
);

export default Menu;
