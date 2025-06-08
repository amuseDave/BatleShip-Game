import Ship from './Ship';

class GameBoard {
  constructor() {
    this.availableShips = new Map([
      [2, 1],
      [3, 2],
      [4, 1],
      [5, 1],
    ]);
    this.ships = []; // Track ship state
    this.attacks = []; // Track attacks on the game board
    this.validPositions = this.initializeGameBoard();
  }

  placeShip(coords, size) {
    console.log(this.validPositions);

    const ship = new Ship(this.shipStack.pop());
    // [{x: [0, 0], y: [0, 1]}

    if (!coords) {
      coords = this.placeRandom(ship.length);
    } else {
      // patikrinti zaidejo geras pasirinktas pozicijas
    }

    ship.coords = coords;
    this.ships.push(ship);
  }

  placeRandom(shipLength) {
    const startingPositionsX = [...this.validPositions.x];
    const startingPositionsY = [...this.validPositions.y];

    const valids = { x: [], y: [] };
    const startPosition = { x: null, y: null };

    while (startingPositionsX.length && startingPositionsY.length) {
      const randomIdxX = Math.floor(Math.random() * startingPositionsX.length);
      const randomIdxY = Math.floor(Math.random() * startingPositionsY.length);

      const validX = startingPositionsX[randomIdxX] - shipLength;
      const validX2 = startingPositionsX[randomIdxX] + shipLength;

      const validY = startingPositionsY[randomIdxY] - shipLength;
      const validY2 = startingPositionsY[randomIdxY] + shipLength;

      for (const x of this.validPositions.x) {
        if (validX === x) valids.x.push(x);
        if (validX2 === x) valids.x.push(x);
        if (validX2 || validX) if (valids.x.length === 2) break;
      }

      for (const y of this.validPositions.y) {
        if (validY === y) valids.y.push(y);
        if (validY2 === y) valids.y.push(y);
        if (validY2 || validY) if (valids.y.length === 2) break;
      }

      if (!valids.x.length && !valids.y.length) {
        startingPositionsX.splice(randomIdxX, 1);
        startingPositionsY.splice(randomIdxY, 1);
        continue;
      }
      startPosition.x = startingPositionsX[randomIdxX];
      startPosition.y = startingPositionsY[randomIdxY];

      break;
    }

    console.log(startPosition, 'start position');
    console.log(valids, 'valid positions');

    // pasirinkti is rastu geru poziciju random pozicija
  }

  receiveAttack(coords) {}

  initializeGameBoard() {
    const map = new Map();
    for (let i = 0; i < 10; i++) {
      map.set(i, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }

    return map;
  }
}

export default GameBoard;
