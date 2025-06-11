import GameBoard from './GameBoard.js';
import Player from './Player.js';

class Controller {
  constructor() {
    this.gameBtn = document.getElementById('game-btn');
    this.gameContainerEl = document.getElementById('game-container');

    this.dragCont = document.getElementById('drag-cont');

    this.init();
  }

  init() {
    this.isGameStarted = false;

    this.player = new Player(true);
    this.player2 = new Player();

    this.player.DOM = GameBoard.buildDOM(this.player.gameBoard.size);
    this.player2.DOM = GameBoard.buildDOM(this.player2.gameBoard.size);

    this.generateDraggableShips();

    this.player.DOM.style.cursor = 'not-allowed';
    this.gameContainerEl.append(this.player.DOM);
  }

  generateDraggableShips() {
    this.dragCont.style.width = this.player.DOM.style.width;
    console.log(this.player.DOM);

    for (const [size, count] of this.player.gameBoard.availableShips) {
      for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.draggable = true;
        div.classList.add('ship');
        div.style.width = `calc(3.2rem * ${size})`;
        div.style.height = '3.2rem';
        this.dragCont.append(div);
      }
    }
  }
}
// Figure out how to display ships for the robot and player

export default Controller;
