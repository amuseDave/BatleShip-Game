import { getRandomElement, getElement, getRange } from '../utils.js';
import Ship from './Ship.js';

class GameBoard {
  constructor(size = 10) {
    this.size = size;
    this.#init();
  }

  placeShip(coords, size) {
    //**********************//
    // Handle Validation //
    //**********************//
    if (size) if (!this.isShipAvailable(size)) return 'invalid size';
    if (coords) {
      let [[startX, endX], [startY, endY]] = [coords.x, coords.y];
      const rangeX = getRange(startX, endX);
      const rangeY = getRange(startY, endY);

      for (let i = 0; i < rangeX.length; i++) {
        for (let j = 0; j < rangeY.length; j++) {
          if (!GameBoard.validateGridPos(rangeX[i], rangeY[j], this.validPositions))
            return 'invalid coords';
        }
      }

      let isValid = false;

      const valids = [];
      valids.push(...this.getValidXPath(size, startX, startY));
      valids.push(...this.getValidYPath(size, startX, startY));

      for (let i = 0; i < valids.length; i++) {
        if (valids[i].x[0] !== coords.x[0]) continue;
        if (valids[i].x[1] !== coords.x[1]) continue;
        if (valids[i].y[0] !== coords.y[0]) continue;
        if (valids[i].y[1] !== coords.y[1]) continue;
        isValid = true;
      }
      if (!isValid) return 'invalid coords';
    }

    //**********************//
    // Handle Ship Placement //
    //**********************//

    if (!size) [[size]] = getRandomElement([...this.availableShips]);
    if (!coords) coords = this.getRandomCoords(size);

    // ********************* //
    // Handle Placement //
    // ********************* //
    this.ships.push({ ship: new Ship(size), coords });
    // ********************* //
    // Delete available ship size  //
    // ********************* //
    this.deleteAvailableShip(size);

    // ********************* //
    // Delete valid position spots //
    // ********************* //
    let [[startX, endX], [startY, endY]] = [coords.x, coords.y];
    const rangeX = getRange(startX, endX);
    const rangeY = getRange(startY, endY);
    for (let i = 0; i < rangeX.length; i++) {
      for (let j = 0; j < rangeY.length; j++) {
        GameBoard.deleteGridPos(rangeX[i], rangeY[j], this.validPositions);
      }
    }
  }

  getRandomCoords(shipLength) {
    this.copiedValidPosGrid = GameBoard.copyGrid(this.validPositions);

    const validPositions = [];

    while (this.copiedValidPosGrid.size) {
      const [randomX, randomY] = GameBoard.getRandomPosition(this.copiedValidPosGrid);

      const validX = this.getValidXPath(shipLength, randomX, randomY);
      const validY = this.getValidYPath(shipLength, randomX, randomY);

      if (validX.length) validPositions.push(...validX);
      if (validY.length) validPositions.push(...validY);

      if (validPositions.length) break;

      GameBoard.deleteGridPos(randomX, randomY, this.copiedValidPosGrid);
    }

    return getRandomElement(validPositions)[0];
  }

  getValidXPath(shipLength, X, Y) {
    const validPositions = [];
    for (let i = X + 1; i < X + shipLength; i++) {
      if (this.validPositions.has(i)) {
        if (this.validPositions.get(i).has(Y)) {
          if (X + shipLength - 1 === i) {
            validPositions.push({ x: [X, i], y: [Y, Y] });
            break;
          }
        } else break;
      } else break;
    }
    for (let i = X - 1; i > X - shipLength; i--) {
      if (this.validPositions.has(i)) {
        if (this.validPositions.get(i).has(Y)) {
          if (X - shipLength + 1 === i) {
            validPositions.push({ x: [X, i], y: [Y, Y] });
            break;
          }
        } else break;
      } else break;
    }

    return validPositions;
  }

  getValidYPath(shipLength, X, Y) {
    const validPositions = [];

    for (let i = Y + 1; i < Y + shipLength; i++) {
      if (this.validPositions.get(X).has(i)) {
        if (Y + shipLength - 1 === i) {
          validPositions.push({ x: [X, X], y: [Y, i] });
          break;
        }
      } else break;
    }

    for (let i = Y - 1; i > Y - shipLength; i--) {
      if (this.validPositions.get(X).has(i)) {
        if (Y - shipLength + 1 === i) {
          validPositions.push({ x: [X, X], y: [Y, i] });
          break;
        }
      } else break;
    }

    return validPositions;
  }

  deleteAvailableShip(shipSize) {
    this.availableShips.set(shipSize, this.availableShips.get(shipSize) - 1);
    if (!this.availableShips.get(shipSize)) this.availableShips.delete(shipSize);
  }

  receiveAttack(coords) {}

  isShipAvailable(size) {
    return this.availableShips.has(size);
  }

  #init() {
    this.availableShips = new Map([
      [2, 1],
      [3, 2],
      [4, 1],
      [5, 1],
    ]); // Available ship sizes
    this.ships = []; // Track ship state
    this.attacks = []; // Track attacks on the game board
    this.validPositions = GameBoard.createGrid(this.size);
    this.copiedValidPosGrid;
  }

  static validateGridPos(x, y, grid) {
    return grid.get(x)?.has(y);
  }

  static deleteGridPos(x, y, grid) {
    grid.get(x).delete(y);
    if (!grid.get(x).size) {
      grid.delete(x);
    }
  }

  static getRandomPosition(gridPositions) {
    const [[randomX]] = getRandomElement([...gridPositions]);
    const [randomY] = getRandomElement([...gridPositions.get(randomX)]);
    return [randomX, randomY];
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

  static buildDOM(size) {
    const gameBoard = document.createElement('div');
    gameBoard.classList = 'gameboard';
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 4.2rem)`;
    gameBoard.style.gridTemplateRows = `repeat(${size}, 4.2rem)`;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const gridCell = document.createElement('div');
        gridCell.dataset.cellPosition = `${j}-${i}`;
        gridCell.classList = 'grid-cell';
        gameBoard.append(gridCell);
      }
    }

    return gameBoard;
  }
}

export default GameBoard;
