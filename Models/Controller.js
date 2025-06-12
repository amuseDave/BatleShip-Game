import GameBoard from './GameBoard.js';
import Player from './Player.js';
import Ship from './Ship.js';

class Controller {
  constructor() {
    this.isGameStarted = false;
    this.dragged = null;

    this.gameBtn = document.getElementById('game-btn');
    this.gameContainerEl = document.getElementById('game-container');
    this.dragCont = document.getElementById('drag-cont');

    this.player = new Player(true);
    this.player2 = new Player();

    this.player.DOM = GameBoard.buildDOM(this.player.gameBoard.size);
    this.player2.DOM = GameBoard.buildDOM(this.player2.gameBoard.size);

    this.player.DOM_SHIPS = Ship.buildDOM(this.player.gameBoard.ships);
    this.player2.DOM_SHIPS = Ship.buildDOM(this.player2.gameBoard.ships);

    this.gameContainerEl.append(this.player.DOM);

    this.generateDraggableShips();
    this.generateDragZones();

    this.generatePlayer2Ships();
  }

  generatePlayer2Ships() {
    const ships = [...this.player2.DOM_SHIPS];

    while (ships.length) {
      const [ship] = ships.splice(Math.floor(Math.random() * ships.length), 1);
      this.player2.gameBoard.placeShip({ id: ship.dataset.id });
    }
  }

  generateDraggableShips() {
    this.dragCont.style.width = `${this.player.DOM.clientWidth}px`;
    for (const shipEL of this.player.DOM_SHIPS) {
      shipEL.draggable = true;
      this.dragCont.append(shipEL);

      shipEL.addEventListener('dragstart', (e) => {
        this.dragged = e.target;
      });
    }
  }

  generateDragZones() {
    this.player.DOM.style.cursor = 'not-allowed';

    this.player.DOM.querySelectorAll('.grid-cell').forEach((el) => {
      el.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      el.addEventListener('dragenter', (event) => {
        if (this.isGameStarted) return;

        el.style.backgroundColor = 'red';
      });

      el.addEventListener('dragleave', (event) => {
        if (this.isGameStarted) return;

        el.style.backgroundColor = 'transparent';
      });

      el.addEventListener('drop', (event) => {
        if (this.isGameStarted) return;

        el.style.backgroundColor = 'transparent';

        const gridCell = event.target;
        const gridPos = gridCell.dataset.cellPosition;

        gridCell.append(this.dragged);
      });
    });
  }
}
// Figure out how to display ships for the robot and player

export default Controller;
