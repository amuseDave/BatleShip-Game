import GameBoard from './GameBoard.js';

class Player {
  constructor(isRealPlayer) {
    this.isMyTurn = false;
    this.isRealPlayer = isRealPlayer;
    this.gameBoard = new GameBoard();
  }
}

export default Player;
