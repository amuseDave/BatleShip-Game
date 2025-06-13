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
      shipEL.style.transformOrigin = 'left';
      shipEL.draggable = true;
      shipEL.style.cursor = 'move';

      shipEL.addEventListener('dragstart', (e) => {
        const gridCell = e.target.closest('.grid-cell');
        if (gridCell) {
          setTimeout(() => {
            gridCell.style.zIndex = 0;
          }, 0);
        }
        e.target.style.zIndex = 0;
        this.dragged = e.target;
      });
      shipEL.addEventListener('dragend', (e) => {
        const gridCell = e.target.closest('.grid-cell');
        if (gridCell) {
          setTimeout(() => {
            gridCell.style.zIndex = 1;
          }, 0);
        }
        e.target.style.zIndex = 1;
      });
      shipEL.addEventListener('click', (e) => {
        //**********************//
        // Handle changin directions if clicked
        //**********************//
        const gridCell = e.target.closest('.grid-cell');
        if (!gridCell) return;

        const gridPos = gridCell.dataset.cellPosition;
        const { length, direction, id } = shipEL.dataset;

        const coords = new Set([gridPos]);

        for (let i = 1; i < length; i++) {
          const posStr =
            direction === 'vertical'
              ? `${+gridPos[0] + i}${gridPos.slice(1)}`
              : `${gridPos.slice(0, 2)}${+gridPos[2] + i}`;
          coords.add(posStr);
        }

        const ship = this.player.gameBoard.placeShip({ coords, id });
        if (!ship) return 'Invalid Ship Position';
        shipEL.dataset.direction = direction === 'vertical' ? 'horizontal' : 'vertical';
        shipEL.style.transform = `rotate(${direction === 'vertical' ? '0deg' : '90deg'})`;
      });
      this.dragCont.append(shipEL);
    }
  }

  generateDragZones() {
    this.player.DOM.style.cursor = 'not-allowed';

    this.player.DOM.querySelectorAll('.grid-cell').forEach((el) => {
      el.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
      el.addEventListener('dragenter', () => {
        if (this.isGameStarted) return;
        el.style.backgroundColor = 'orange';
      });
      el.addEventListener('dragleave', () => {
        if (this.isGameStarted) return;
        el.style.backgroundColor = 'transparent';
      });

      el.addEventListener('drop', () => {
        if (this.isGameStarted) return;

        const gridCell = el;

        this.dragged.style.cursor = 'pointer';
        gridCell.style.backgroundColor = 'transparent';

        const gridPos = gridCell.dataset.cellPosition;
        const { length, direction, id } = this.dragged.dataset;

        const coords = new Set([gridPos]);

        for (let i = 1; i < length; i++) {
          const posStr =
            direction === 'horizontal'
              ? `${+gridPos[0] + i}${gridPos.slice(1)}`
              : `${gridPos.slice(0, 2)}${+gridPos[2] + i}`;
          coords.add(posStr);
        }

        const ship = this.player.gameBoard.placeShip({ coords, id });
        if (!ship) return 'Invalid Ship Position';
        // Append if the pos is valid
        gridCell.append(this.dragged);
      });
    });
  }
}
// Figure out how to display ships for the robot and player

export default Controller;
