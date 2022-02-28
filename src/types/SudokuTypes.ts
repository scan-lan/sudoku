const validValues = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

type coordinate = [number, number];
type sudokuCellValue = "" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type sudokuGrid = sudokuCellValue[][];
type sudokuGroup = "row" | "column" | "box";

export const valueIsSudokuValue = (value: string): value is sudokuCellValue => {
  return validValues.includes(value);
};

export type { coordinate, sudokuCellValue, sudokuGrid, sudokuGroup };
