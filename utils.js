export function getRandomElement(arr) {
  const idx = Math.floor(Math.random * arr.length);
  return [arr[idx], idx];
}

export function getElement(arr, element) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === element) return [arr[i], i];
  }
}

export function copyGrid(grid) {
  const copy = [...grid];

  for (let i = 0; i < copy.length; i++) {
    copy[i][1] = new Set(copy[i][1]);
  }

  return copy;
}
