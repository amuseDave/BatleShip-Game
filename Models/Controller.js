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
    this.gameContainerEl.append(this.player2.DOM);

    this.generateButton();
    this.generateDraggableShips();
    this.generateDragZones();

    this.generatePlayer2NPCShips();
  }

  startGame() {
    this.isGameStarted = true;
  }
  generateButton() {
    this.gameBtn.addEventListener('click', () => {
      if (this.dragCont.children.length < 1) {
        this.startGame();
      }
    });
  }
  generatePlayer2NPCShips() {
    const DOM_SHIPS = [...this.player2.DOM_SHIPS];

    while (DOM_SHIPS.length) {
      const [DOM_SHIP] = DOM_SHIPS.splice(
        Math.floor(Math.random() * DOM_SHIPS.length),
        1
      );
      const ship = this.player2.gameBoard.placeShip({ id: DOM_SHIP.dataset.id });

      DOM_SHIP.classList.remove(
        ship.direction === 'vertical' ? 'ship-placed-x' : 'ship-placed-y'
      );
      DOM_SHIP.classList.add(
        ship.direction === 'vertical' ? 'ship-placed-y' : 'ship-placed-x'
      );
      console.log(ship);

      DOM_SHIP.style.width =
        ship.direction === 'vertical' ? '2.8rem' : `calc(4.2rem * ${ship.length})`;
      DOM_SHIP.style.height =
        ship.direction === 'vertical' ? `calc(4.2rem * ${ship.length})` : '2.8rem';

      const coords = [...ship.coords];
      const first = coords[0];
      const last = coords[coords.length - 1];

      let gridPos;

      if (first[0] < last[0] || first[2] < last[2]) gridPos = first;
      else gridPos = last;

      this.player2.DOM.querySelector(
        `.grid-cell[data-cell-position="${gridPos}"]`
      ).append(DOM_SHIP);
    }
  }

  generateDraggableShips() {
    this.dragCont.style.width = `${this.player.DOM.clientWidth}px`;
    for (const shipEL of this.player.DOM_SHIPS) {
      shipEL.draggable = true;
      shipEL.style.cursor = 'move';

      shipEL.addEventListener('dragstart', (e) => {
        if (this.isGameStarted) return;
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
        if (this.isGameStarted) return;
        const gridCell = e.target.closest('.grid-cell');
        if (gridCell) {
          setTimeout(() => {
            gridCell.style.zIndex = 1;
          }, 0);
        }
        e.target.style.zIndex = 1;
      });
      shipEL.addEventListener('click', (e) => {
        if (this.isGameStarted) return;
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

        shipEL.style.width =
          direction === 'vertical' ? `calc(4.2rem * ${length})` : '2.8rem';
        shipEL.style.height =
          direction === 'vertical' ? '2.8rem' : `calc(4.2rem * ${length})`;

        shipEL.classList.add(
          direction === 'vertical' ? 'ship-placed-x' : 'ship-placed-y'
        );
        shipEL.classList.remove(
          direction === 'vertical' ? 'ship-placed-y' : 'ship-placed-x'
        );
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

        this.dragged.classList.add(
          direction === 'vertical' ? 'ship-placed-y' : 'ship-placed-x'
        );
        this.dragged.classList.remove(
          direction === 'vertical' ? 'ship-placed-x' : 'ship-placed-y'
        );

        // Append if the pos is valid
        gridCell.append(this.dragged);

        if (this.dragCont.children.length === 0) {
          this.gameBtn.disabled = false;
          this.gameBtn.style.cursor = 'pointer';
        }
      });
    });
  }
}
// Figure out how to display ships for the robot and player

export default Controller;
