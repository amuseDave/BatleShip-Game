import { getRandomElement, getElement } from '../utils.js';
import Ship from './Ship.js';

class GameBoard {
  constructor(size = 10) {
    this.size = size;
    this.ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
    this.attacks = []; // Track attacks on the game board
    this.validGrid = GameBoard.buildGrid(this.size);
  }

  placeShip({ coords, id }) {
    if (!id) return 'invalid ship id';
    let ship;

    if (id) {
      ship = this.ships.find((ship) => ship.id === id);
      if (!ship) return 'invalid ship';
    }

    //**********************//
    // Handle Coord Validation //
    //**********************//

    //**********************//
    // Get Random Coords//
    //**********************//
    if (!coords) coords = this.getRandomCoords(ship);
    ship.coords = coords;
  }

  getRandomCoords(ship) {
    const validStartPositions = new Set(this.validGrid);
    console.log(validStartPositions);
    const validPositions = [];

    while (validStartPositions.size) {
      const randomStartPos = [...validStartPositions][
        Math.floor(Math.random() * validStartPositions.size)
      ];

      console.log(randomStartPos);

      break;

      const validX = this.getValidXPath(shipLength, randomX, randomY);
      const validY = this.getValidYPath(shipLength, randomX, randomY);

      if (validX.length) validPositions.push(...validX);
      if (validY.length) validPositions.push(...validY);

      if (validPositions.length) break;

      GameBoard.deleteGridPos(randomX, randomY, this.copiedValidPosGrid);
    }

    return getRandomElement(validPositions)[0];
  }

  getValidXPath() {}
  getValidYPath() {}

  receiveAttack(coords) {}

  static buildGrid(size) {
    const set = new Set();
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        set.add(`${j}-${i}`);
      }
    }
    return set;
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
