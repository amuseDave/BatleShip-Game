import GameBoard from './GameBoard.js';

class Player {
  constructor(isRealPlayer) {
    this.isMyTurn = isRealPlayer;
    this.gameBoard = new GameBoard();
  }
}

export default Player;
