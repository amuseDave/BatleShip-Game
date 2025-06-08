import Ship from './Ship';

class GameBoard {
  constructor() {
    this.shipStack = [2, 3, 3, 4, 5];
    this.ships = [];
    this.attacks = [];
  }

  placeShip(coords) {
    const ship = new Ship(this.shipStack.pop());

    if (!coords) {
    }

    ship.coords = coords;
    this.ships.push(ship);
  }

  receiveAttack(coords) {}
}

export default GameBoard;
