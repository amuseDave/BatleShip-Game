export function getRandomElement(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return [arr[idx], idx];
}

export function getElement(arr, element) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === element) return [arr[i], i];
  }
}
