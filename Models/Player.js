import GameBoard from './GameBoard.js';

class Player {
  constructor(isRealPlayer) {
    this.isMyTurn = false;
    this.isRealPlayer = isRealPlayer;
    this.gameBoard = new GameBoard();

    if (!isRealPlayer) this.generateShipsRandomPos();
  }

  generateShipsRandomPos() {
    while (this.gameBoard.availableShips.size) {
      this.gameBoard.placeShip();
    }
  }
}

export default Player;
