import React from "react";
import "./Menu.css";

interface MenuProps {
  onGuessAllClick: () => void;
  onFillSolvedClick: () => void;
}

const Menu = ({ onGuessAllClick, onFillSolvedClick }: MenuProps) => (
  <div className="menu">
    <button onClick={onGuessAllClick}>Guess</button>
    <button onClick={onFillSolvedClick}>Fill solved</button>
  </div>
);

export default Menu;
