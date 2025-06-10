import GameBoard from './GameBoard.js';
import Player from './Player.js';

class Controller {
  constructor() {
    this.gameContainerEl = document.getElementById('game-container');
    this.isGameStarted = false;
    this.player = new Player(true);
    this.npc = new Player();

    this.init();
  }

  startGame() {
    this.isGameStarted = true;
  }

  resetGame() {
    this.isGameStarted = false;
  }

  init() {
    const GM_DOM = GameBoard.buildDOM(this.player.gameBoard.size);
    GM_DOM.style.cursor = 'not-allowed';
    this.gameContainerEl.append(GM_DOM);
  }
}

export default Controller;
