export function getRandomElement(arr) {
  const idx = Math.floor(Math.random * arr.length);
  return [arr[idx], idx];
}

export function getElement(arr, element) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === element) return [arr[i], i];
  }
}

export function copyGameBoardGrid(grid) {
  const copy = [...grid];

  for (let i = 0; i < copy.length; i++) {
    copy[i] = [copy[i][0], new Set([...copy[i][1]])];
  }

  console.log(copy[0] === grid[0]);
  console.log(copy[0][1] === grid[0][1]);
  console.log(copy, grid);

  return copy;
}

export function createGameBoardGrid(size) {
  const grid = [];
  for (let i = 0; i < size; i++) {
    grid.push([i, new Set()]);
    for (let j = 0; j < size; j++) {
      grid[i][1].add(j);
    }
  }
  return grid;
}
