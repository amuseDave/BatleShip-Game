export function getRandomElement(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return [arr[idx], idx];
}

export function getElement(arr, element) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === element) return [arr[i], i];
  }
}

export function getRange(start, end) {
  const range = [start];
  while (start !== end) {
    if (start > end) start--;
    else if (start < end) start++;
    range.push(start);
  }
  return range;
}

export function buildDOMGameBoard(size) {
  const gameBoard = document.createElement('div');
  gameBoard.classList = 'gameboard';
  gameBoard.style.gridTemplateColumns = `repeat(20px, ${size})`;
  gameBoard.style.gridTemplateRows = `repeat(20px, ${size})`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const gridCell = document.createElement('div');
      gridCell.dataset.cellPosition = `${i}-${j}`;
      gridCell.classList = 'grid-cell';
      gameBoard.append(gridCell);
    }
  }

  return gameBoard;
}
