import { coordinate, sudokuCell, sudokuGrid } from "../types/SudokuTypes";
import CellInfo from "../types/CellInfo";

export default class SudokuGrid {
  rows: SudokuCell[][];

  constructor(rows: CellInfo[][]) {
    this.rows = [[], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let cell = new SudokuCell([i, j], rows[i][j].value, rows[i][j].guesses);
        this.rows[i].push(cell);
      }
    }
  }

  cellAt(position: coordinate) {
    return this.rows[position[0]][position[1]];
  }

  row(index: number) {
    return this.rows[index];
  }

  column(index: number) {
    return this.rows.map((row) => row[index]);
  }

  box(index: number) {
    const boxArray = [] as SudokuCell[];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let row = Math.floor(index / 3) * 3 + i;
        let col = j + (index % 3) * 3;
        boxArray.push(this.rows[row][col]);
      }
    }

    return boxArray;
  }
}

export class SudokuCell {
  row: number;
  column: number;
  value: sudokuCell;
  box: number;
  guesses: number[] = [];

  constructor(position: coordinate, value: sudokuCell, guesses: number[]) {
    this.row = position[0];
    this.column = position[1];
    this.value = value;
    this.guesses = guesses;
    if (this.row < 3) this.box = Math.floor(this.column / 3);
    else if (this.row < 6) this.box = Math.floor(this.column / 3) + 3;
    else this.box = Math.floor(this.column / 3) + 6;
  }
}
