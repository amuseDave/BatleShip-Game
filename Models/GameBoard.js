import {
  getRandomElement,
  getElement,
  copyGameBoardGrid,
  createGameBoardGrid,
} from '../utils';
import Ship from './Ship';

class GameBoard {
  constructor() {
    this.availableShips = new Set([2, 3, 3, 4, 5]); // Available ship sizes
    this.ships = []; // Track ship state
    this.attacks = []; // Track attacks on the game board
    this.gameBoardSize = 10;
    this.gameBoardValidPositions = createGameBoardGrid(this.gameBoardSize);
  }

  placeShip(coords, size) {
    let shipSizeIdx;
    //**********************//
    // Handle Validation //
    //**********************//
    if (size) {
      const el = this.availableShips.has(size);
      if (!el) return 'invalid size';
    }
    if (coords) {
    }

    //**********************//
    // Handle Ship Placement //
    //**********************//
    if (!size) size = getRandomElement([...this.availableShips]);
    if (!coords) coords = this.placeRandom(size);
    this.availableShips.delete(size);

    // Handle placement
  }

  placeRandom(shipLength) {
    // console.log(this.validPositions);

    const copiedValidPosGrid = copyGameBoardGrid(this.gameBoardValidPositions);

    // Create validPosGridCopy
    // to Remove Invalid Positions with given shipSize
    // First select random X & Y start positions

    const validPositions = { x: [], y: [] };
    const startPositions = { x: null, y: null };

    while (copiedValidPosGrid.size) {
      const [randomX] = getRandomElement([...copiedValidPosGrid]);
      const randomY = getRandomElement([...copiedValidPosGrid.get(randomX)]);

      // Check for all valid positions for
      // randomX + shipLength(X) && randoX - shipLength(X)
      // randomY + shipLength(Y) && randoY - shipLength(Y)
      // Create utility function for reusability in checking when user manually inputs
      // for (let i = mainXIdx + 1; i < mainXIdx + shipLength; i++) {}

      break;
    }

    // while (startingPositionsX.length && startingPositionsY.length) {
    //   const randomIdxX = Math.floor(Math.random() * startingPositionsX.length);
    //   const randomIdxY = Math.floor(Math.random() * startingPositionsY.length);
    //   const validX = startingPositionsX[randomIdxX] - shipLength;
    //   const validX2 = startingPositionsX[randomIdxX] + shipLength;
    //   const validY = startingPositionsY[randomIdxY] - shipLength;
    //   const validY2 = startingPositionsY[randomIdxY] + shipLength;
    //   for (const x of this.validPositions.x) {
    //     if (validX === x) valids.x.push(x);
    //     if (validX2 === x) valids.x.push(x);
    //     if (validX2 || validX) if (valids.x.length === 2) break;
    //   }
    //   for (const y of this.validPositions.y) {
    //     if (validY === y) valids.y.push(y);
    //     if (validY2 === y) valids.y.push(y);
    //     if (validY2 || validY) if (valids.y.length === 2) break;
    //   }
    //   if (!valids.x.length && !valids.y.length) {
    //     startingPositionsX.splice(randomIdxX, 1);
    //     startingPositionsY.splice(randomIdxY, 1);
    //     continue;
    //   }
    //   startPosition.x = startingPositionsX[randomIdxX];
    //   startPosition.y = startingPositionsY[randomIdxY];
    //   break;
    // }
    // console.log(startPosition, 'start position');
    // console.log(valids, 'valid positions');
    // pasirinkti is rastu geru poziciju random pozicija
  }

  receiveAttack(coords) {}
}

export default GameBoard;
