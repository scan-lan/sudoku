import React from "react";
import "./Menu.css";

interface MenuProps {
  onGetAllCandidatesClick: () => void;
  onFilterCandidatesClick: () => void;
  onFillSolvedClick: () => void;
  filterCandidatesActive: boolean;
}

const Menu = ({
  onGetAllCandidatesClick,
  onFilterCandidatesClick,
  onFillSolvedClick,
  filterCandidatesActive,
}: MenuProps) => (
  <div className="menu">
    <button onClick={onGetAllCandidatesClick}>Get candidates</button>
    <button disabled={filterCandidatesActive} onClick={onFilterCandidatesClick}>
      Filter candidates
    </button>
    <button onClick={onFillSolvedClick}>Fill solved</button>
  </div>
);

export default Menu;
