import GameBoard from './GameBoard';

class Player {
  constructor(isRealPlayer) {
    this.isMyTurn = false;
    this.isRealPlayer = isRealPlayer;
    this.gameBoard = new GameBoard(10);

    this.generateShipsRandomPos();
  }

  generateShipsRandomPos() {
    while (this.gameBoard.shipStack.length) {
      this.gameBoard.placeShip();
    }
  }
}

export default Player;
