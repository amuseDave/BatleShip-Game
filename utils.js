export function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getElement(arr, element) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === element) return arr[i];
  }
}

export function copyGameBoardGrid(grid) {
  const copy = new Map(grid);

  for (const [key, set] of grid) {
    copy.set(key, new Set(set));
  }

  return copy;
}

export function createGameBoardGrid(size) {
  const grid = new Map();
  for (let i = 0; i < size; i++) {
    grid.set(i, new Set());
    for (let j = 0; j < size; j++) {
      grid.get(i).add(j);
    }
  }
  return grid;
}
