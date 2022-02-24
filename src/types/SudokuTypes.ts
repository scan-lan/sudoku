type coordinate = [number, number];
type sudokuCell = number | "";
type sudokuGrid = sudokuCell[][];
type sudokuGroup = "row" | "column" | "box";

export type { coordinate, sudokuCell, sudokuGrid, sudokuGroup };
