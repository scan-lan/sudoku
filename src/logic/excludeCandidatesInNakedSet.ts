import SudokuCell, { SudokuGrid } from "../types/SudokuCell";
import { sudokuGroup } from "../types/SudokuTypes";
import { getNeighbourFunctions, NeighbourFunction } from "./gridLogic";
import { CellWithCandidates } from "./solve";

export const isInNakedSet = (
  cell: SudokuCell,
  grid: SudokuGrid,
  group?: sudokuGroup
): boolean => {
  const setSize = cell.candidates.length;
  let inNakedSet;
  const neighbourFunctions = group
    ? (getNeighbourFunctions(cell, grid, group) as () => SudokuCell[])
    : (getNeighbourFunctions(cell, grid) as NeighbourFunction[]);

  const candidatesMatch = (neighbour: SudokuCell) => {
    if (neighbour.candidates.length !== cell.candidates.length) return false;
    for (let i = 0; i < neighbour.candidates.length; i++) {
      if (neighbour.candidates[i] !== cell.candidates[i]) return false;
    }
    return true;
  };

  if (Array.isArray(neighbourFunctions)) {
    inNakedSet = neighbourFunctions.some((getNeighbours) => {
      const neighbours = getNeighbours.func();
      const neighboursWithMatchingCandidates =
        neighbours.filter(candidatesMatch);
      return neighboursWithMatchingCandidates.length + 1 === setSize;
    });
  } else {
    const neighbours = neighbourFunctions();
    const neighboursWithMatchingCandidates = neighbours.filter(candidatesMatch);
    inNakedSet = neighboursWithMatchingCandidates.length + 1 === setSize;
  }

  return inNakedSet;
};

export const excludeCandidatesInNakedSet = (
  cell: SudokuCell,
  grid: SudokuGrid
): CellWithCandidates => {
  // TODO: simplify this !!
  const cellCandidates = [] as number[];
  const impossibleValues = new Set<number>();
  const neighbourFunctions = getNeighbourFunctions(
    cell,
    grid
  ) as NeighbourFunction[];

  neighbourFunctions.forEach((neighbourFunction) => {
    if (!isInNakedSet(cell, grid, neighbourFunction.group)) {
      const neighbours = neighbourFunction.func();
      const neighboursInNakedSets = neighbours.filter((cell) =>
        isInNakedSet(cell, grid, neighbourFunction.group)
      );
      if (neighboursInNakedSets && neighboursInNakedSets.length > 0) {
        neighboursInNakedSets.forEach((neighbour) =>
          neighbour.candidates.forEach((candidate) =>
            impossibleValues.add(candidate)
          )
        );
      }
    }
  });

  cell.candidates.forEach((candidate) => {
    if (!impossibleValues.has(candidate)) cellCandidates.push(candidate);
  });

  return {
    cell: cell,
    candidates: cellCandidates,
  };
};
