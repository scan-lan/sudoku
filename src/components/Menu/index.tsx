import React from "react";
import "./Menu.css";

interface MenuProps {
  onGetAllCandidatesClick: () => void;
  onFillSolvedClick: () => void;
  onFilterCandidatesClick: () => void;
}

const Menu = ({
  onGetAllCandidatesClick,
  onFillSolvedClick,
  onFilterCandidatesClick,
}: MenuProps) => (
  <div className="menu">
    <button onClick={onGetAllCandidatesClick}>Get candidates</button>
    <button onClick={onFilterCandidatesClick}>Filter</button>
    <button onClick={onFillSolvedClick}>Fill solved</button>
  </div>
);

export default Menu;
