import GameBoard from './GameBoard.js';
import Player from './Player.js';

class Controller {
  constructor() {
    this.isGameStarted = false;

    this.gameBtn = document.getElementById('game-btn');
    this.gameContainerEl = document.getElementById('game-container');

    this.dragCont = document.getElementById('drag-cont');

    this.player = new Player(true);
    this.player2 = new Player();

    this.player.DOM = GameBoard.buildDOM(this.player.gameBoard.size);
    this.player2.DOM = GameBoard.buildDOM(this.player2.gameBoard.size);

    this.player.DOM.style.cursor = 'not-allowed';
    this.gameContainerEl.append(this.player.DOM);

    this.player.DOM_SHIPS = this.generatePlayerShips(
      this.player.gameBoard.availableShips
    );
    this.player2.DOM_SHIPS = this.generatePlayerShips(
      this.player2.gameBoard.availableShips
    );

    this.generateDraggableShips();
  }

  generatePlayerShips(ships) {
    const DOM_SHIPS = [];
    for (const [size, count] of ships) {
      for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.classList.add('ship');
        div.style.width = `calc(3.2rem * ${size})`;
        div.style.height = '3.2rem';
        DOM_SHIPS.push(div);
      }
    }
    return DOM_SHIPS;
  }
  generateDraggableShips() {
    this.player.DOM.querySelectorAll('.grid-cell').forEach((el) => {
      el.addEventListener('dragenter', (event) => {
        el.style.backgroundColor = 'red';
      });

      el.addEventListener('dragleave', (event) => {
        el.style.backgroundColor = 'transparent';
      });
    });

    this.dragCont.style.width = `${this.player.DOM.clientWidth}px`;
    for (const shipEL of this.player.DOM_SHIPS) {
      shipEL.draggable = true;
      this.dragCont.append(shipEL);

      shipEL.addEventListener('drag', (e) => {
        this.player.DOM.style.cursor = 'default';
      });
    }
  }
}
// Figure out how to display ships for the robot and player

export default Controller;
