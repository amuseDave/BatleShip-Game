export function getRandomElement(arr) {
  const idx = Math.floor(Math.random * arr.length);
  return [arr[idx], idx];
}
