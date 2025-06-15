import GameBoard from './GameBoard.js';
import Player from './Player.js';

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

    this.gameContainerEl.append(this.player.DOM);
    this.gameContainerEl.append(this.player2.DOM);

    this.generateButton();
    this.generateDraggableShips();
    this.generateDragZones();

    this.generatePlayer2NPCShips();

    this.generateControls();
  }

  startGame() {
    this.isGameStarted = true;
    this.player2.DOM.style.display = 'grid';
    this.gameBtn.style.display = 'none';
    this.player.gameBoard.ships.forEach((ship) => {
      ship.DOM.style.cursor = 'not-allowed';
      ship.DOM.draggable = false;
    });
    this.player2.DOM.style.cursor = 'pointer';
  }
  generateControls() {
    const grid = GameBoard.buildGrid(10);
    this.player2.DOM.addEventListener('click', (e) => {
      if (this.player.isMyTurn && this.isGameStarted) {
        const gridCell = e.target.closest('.grid-cell');

        if (gridCell) {
          const state = this.player2.gameBoard.receiveAttack(
            gridCell.dataset.cellPosition
          );

          if (state === 'Invalid Attack') return;

          gridCell.style.cursor = 'not-allowed';
          if (state.isHit) {
            gridCell.style.backgroundColor = 'rgb(254, 108, 108)';
            if (state.isSunk) {
              state.shipDOM.style.display = 'block';
              if (state.gameEnd) {
                setTimeout(() => {
                  window.alert('YOU WON!');
                  window.location.href = '';
                }, 50);
              }
            }
          } else {
            gridCell.style.backgroundColor = 'rgb(152, 200, 255)';

            // ROBOT ATTACK
            this.player.isMyTurn = false;
            const arr = [...grid];
            const idx = Math.floor(Math.random() * arr.length);
            grid.delete(arr[idx]);
            let gridCell2 = this.player.DOM.querySelector(
              `[data-cell-position="${arr[idx]}"]`
            );
            let state = this.player.gameBoard.receiveAttack(arr[idx]);
            arr.splice(idx, 1);

            while (state.isHit) {
              gridCell2.style.backgroundColor = 'rgb(254, 108, 108)';

              if (state.isSunk) {
                if (state.gameEnd) {
                  window.alert('YOU LOST!');
                  window.location.href = '';
                }
              }

              const idx = Math.floor(Math.random() * arr.length);
              grid.delete(arr[idx]);
              gridCell2 = this.player.DOM.querySelector(
                `[data-cell-position="${arr[idx]}"]`
              );
              state = this.player.gameBoard.receiveAttack(arr[idx]);
              arr.splice(idx, 1);
            }

            gridCell2.style.backgroundColor = 'rgb(152, 200, 255)';
            this.player.isMyTurn = true;
          }
        }
      }
    });
  }
  generateButton() {
    this.gameBtn.addEventListener('click', () => {
      if (this.dragCont.children.length < 1) {
        this.startGame();
      }
    });
  }
  generatePlayer2NPCShips() {
    const DOM_SHIPS = [...this.player2.gameBoard.ships];

    while (DOM_SHIPS.length) {
      const idx = Math.floor(Math.random() * DOM_SHIPS.length);
      const { DOM: DOM_SHIP } = DOM_SHIPS[idx];
      DOM_SHIPS.splice(idx, 1);

      DOM_SHIP.style.display = 'none';
      const ship = this.player2.gameBoard.placeShip({ id: DOM_SHIP.dataset.id });

      DOM_SHIP.classList.remove(
        ship.direction === 'vertical' ? 'ship-placed-x' : 'ship-placed-y'
      );
      DOM_SHIP.classList.add(
        ship.direction === 'vertical' ? 'ship-placed-y' : 'ship-placed-x'
      );

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

      this.player2.DOM.style.display = 'none';
    }
  }

  generateDraggableShips() {
    this.dragCont.style.width = `${this.player.DOM.clientWidth}px`;
    console.log(this.player.gameBoard.ships);

    for (const { DOM } of this.player.gameBoard.ships) {
      DOM.draggable = true;
      DOM.style.cursor = 'move';

      DOM.addEventListener('dragstart', (e) => {
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
      DOM.addEventListener('dragend', (e) => {
        if (this.isGameStarted) return;
        const gridCell = e.target.closest('.grid-cell');
        if (gridCell) {
          setTimeout(() => {
            gridCell.style.zIndex = 1;
          }, 0);
        }
        e.target.style.zIndex = 1;
      });
      DOM.addEventListener('click', (e) => {
        if (this.isGameStarted) return;
        //**********************//
        // Handle changin directions if clicked
        //**********************//
        const gridCell = e.target.closest('.grid-cell');
        if (!gridCell) return;

        const gridPos = gridCell.dataset.cellPosition;
        const { length, direction, id } = DOM.dataset;

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
        DOM.dataset.direction = direction === 'vertical' ? 'horizontal' : 'vertical';

        DOM.style.width =
          direction === 'vertical' ? `calc(4.2rem * ${length})` : '2.8rem';
        DOM.style.height =
          direction === 'vertical' ? '2.8rem' : `calc(4.2rem * ${length})`;

        DOM.classList.add(direction === 'vertical' ? 'ship-placed-x' : 'ship-placed-y');
        DOM.classList.remove(
          direction === 'vertical' ? 'ship-placed-y' : 'ship-placed-x'
        );
      });

      this.dragCont.append(DOM);
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
