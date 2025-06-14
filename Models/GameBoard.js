import Ship from './Ship.js';

class GameBoard {
  constructor(size = 10) {
    this.size = size;
    this.ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
    this.attacks = new Set(); // Track attacks on the game board
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
      const validPositions = [];
      const startPos = [...coords][0];
      validPositions.push(...this.getValidXPath(startPos, ship));
      validPositions.push(...this.getValidYPath(startPos, ship));

      console.log(validPositions);

      let isValid = false;

      for (const element of validPositions) {
        if (JSON.stringify([...element.pos]) === JSON.stringify([...coords]))
          isValid = true;
      }

      if (!isValid) return;
    }

    //**********************//
    // Get Random Coords//
    //**********************//
    if (!coords) {
      const { pos, direction } = this.getRandomCoords(ship);
      ship.direction = direction;
      coords = pos;
    }

    //**********************//
    // Delete valid coords after ship placement
    // If coords are from the same ship but changed add them back
    //**********************//
    for (const pos of ship.coords) {
      this.validGrid.add(pos);
    }
    for (const pos of coords) {
      this.validGrid.delete(pos);
    }

    //**********************//
    // Set valid coords
    //**********************//
    ship.coords = coords;
    return ship;
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

    for (let i = 0; i < ship.length; i++) {
      const posStr = `${+startPos[0] + i}${startPos.slice(1)}`;
      if (this.validGrid.has(posStr) || ship.coords.has(posStr)) {
        pos1.add(posStr);
      } else break;
    }

    for (let i = 0; i < ship.length; i++) {
      const posStr = `${+startPos[0] - i}${startPos.slice(1)}`;
      if (this.validGrid.has(posStr) || ship.coords.has(posStr)) {
        pos2.add(posStr);
      } else break;
    }

    if (pos1.size === ship.length) validPos.push({ pos: pos1, direction: 'horizontal' });
    if (pos2.size === ship.length) validPos.push({ pos: pos2, direction: 'horizontal' });

    return validPos;
  }
  getValidYPath(startPos, ship) {
    const validPos = [];

    const pos1 = new Set([startPos]);
    const pos2 = new Set([startPos]);

    for (let i = 1; i < ship.length; i++) {
      const posStr = `${startPos.slice(0, 2)}${+startPos[2] + i}`;

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

    if (pos1.size === ship.length) validPos.push({ pos: pos1, direction: 'vertical' });
    if (pos2.size === ship.length) validPos.push({ pos: pos2, direction: 'vertical' });

    return validPos;
  }

  receiveAttack(coords) {
    if (this.attacks.has(coords)) return 'Invalid Attack';
    this.attacks.add(coords);
    console.log(coords);

    let isHit = false;
    let isSunk = false;
    for (const ship of this.ships) {
      if (ship.coords.has(coords)) {
        isHit = true;
        ship.hit();
        if (ship.isSunk()) isSunk = true;
      }
    }

    return { isHit, isSunk };
  }

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
