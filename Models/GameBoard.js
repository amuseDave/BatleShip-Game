import { getRandomElement, getElement } from '../utils';
import Ship from './Ship';

class GameBoard {
  constructor() {
    this.availableShips = new Map([
      [2, 1],
      [3, 2],
      [4, 1],
      [5, 1],
    ]); // Available ship sizes
    this.ships = []; // Track ship state
    this.attacks = []; // Track attacks on the game board
    this.size = 10;
    this.validPositions = GameBoard.createGrid(this.size);
  }

  placeShip(coords, size) {
    let shipSizeIdx;
    //**********************//
    // Handle Validation //
    //**********************//
    if (size) if (!this.isShipAvailable(size)) return 'invalid position';
    if (coords) {
    }

    //**********************//
    // Handle Ship Placement //
    //**********************//
    if (!size) [size] = getRandomElement([...this.availableShips]);
    if (!coords) coords = this.placeRandom(size);

    this.availableShips.set(size, this.availableShips.get(size) - 1);
    if (!this.availableShips.get(size)) this.availableShips.delete(size);

    // Handle placement
  }

  placeRandom(shipLength) {
    // console.log(this.validPositions);

    const copiedValidPosGrid = GameBoard.copyGrid(this.validPositions);

    // Create validPosGridCopy
    // to Remove Invalid Positions with given shipSize
    // First select random X & Y start positions

    const validPositions = { x: [], y: [] };
    const startPositions = { x: null, y: null };

    while (copiedValidPosGrid.size) {
      const [randomX, randomY] = this.getRandomPosition(copiedValidPosGrid);

      // Check for all valid positions for
      // randomX + shipLength(X) && randoX - shipLength(X)
      // randomY + shipLength(Y) && randoY - shipLength(Y)
      // Create utility function for reusability in checking when user manually inputs
      // for (let i = mainXIdx + 1; i < mainXIdx + shipLength; i++) {}

      break;
    }
  }

  receiveAttack(coords) {}

  getRandomPosition(gridPositions) {
    const [[randomX]] = getRandomElement([...gridPositions]);
    const [randomY] = getRandomElement([...gridPositions.get(randomX)]);
    return [randomX, randomY];
  }

  isShipAvailable(size) {
    return this.availableShips.has(size);
  }

  static createGrid(size) {
    const grid = new Map();
    for (let i = 0; i < size; i++) {
      grid.set(i, new Set());
      for (let j = 0; j < size; j++) {
        grid.get(i).add(j);
      }
    }
    return grid;
  }

  static copyGrid(grid) {
    const copy = new Map(grid);
    for (const [key, set] of grid) {
      copy.set(key, new Set(set));
    }
    return copy;
  }
}

export default GameBoard;
