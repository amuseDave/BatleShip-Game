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
    if (coords) {
      console.log(coords);
    }

    //**********************//
    // Get Random Coords//
    //**********************//
    if (!coords) coords = this.getRandomCoords(ship);

    ship.coords = coords;
  }

  getRandomCoords(ship) {
    const validStartPositions = new Set(this.validGrid);
    const validPositions = [];

    while (validStartPositions.size) {
      const randomStartPos = [...validStartPositions][
        Math.floor(Math.random() * validStartPositions.size)
      ];

      validPositions.push(...this.getValidXPath(randomStartPos, ship));
      validPositions.push(...this.getValidYPath(randomStartPos, ship));

      if (validPositions.length) break;
      validStartPositions.delete(randomStartPos);
    }

    return validPositions[Math.floor(Math.random() * validPositions.length)];
  }

  getValidXPath(startPos, ship) {
    const validPos = [];

    const pos1 = new Set([startPos]);
    const pos2 = new Set([startPos]);

    for (let i = 1; i < ship.length; i++) {
      const posStr = `${+startPos[0] + i}${startPos.slice(1)}`;
      if (this.validGrid.has(posStr) || ship.coords.has(posStr)) {
        pos1.add(posStr);
      } else break;
    }

    for (let i = 1; i < ship.length; i++) {
      const posStr = `${+startPos[0] - i}${startPos.slice(1)}`;
      if (this.validGrid.has(posStr) || ship.coords.has(posStr)) {
        pos2.add(posStr);
      } else break;
    }

    if (pos1.size === ship.length) validPos.push(pos1);
    if (pos2.size === ship.length) validPos.push(pos2);

    return validPos;
  }
  getValidYPath(startPos, ship) {
    const validPos = [];

    const pos1 = new Set([startPos]);
    const pos2 = new Set([startPos]);

    for (let i = 1; i < ship.length; i++) {
      const posStr = `${startPos.slice(0, 2)}${+startPos[2] + i}`;
      console.log(posStr);

      if (this.validGrid.has(posStr) || ship.coords.has(posStr)) {
        pos1.add(posStr);
      } else break;
    }

    for (let i = 1; i < ship.length; i++) {
      const posStr = `${startPos.slice(0, 2)}${+startPos[2] - i}`;
      if (this.validGrid.has(posStr) || ship.coords.has(posStr)) {
        pos2.add(posStr);
      } else break;
    }

    if (pos1.size === ship.length) validPos.push(pos1);
    if (pos2.size === ship.length) validPos.push(pos2);

    return validPos;
  }

  receiveAttack(coords) {}

  static buildGrid(size) {
    const set = new Set();
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
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
