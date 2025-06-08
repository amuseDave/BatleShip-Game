import GameBoard from './Models/GB';
import Ship from './Models/Ship';

describe('ship', () => {
  it('validates if sunk', () => {
    const ship = new Ship(0);
    expect(ship.isSunk()).toBe(true);
  });
  it('validates if not sunk', () => {
    const ship = new Ship(1);
    expect(ship.isSunk()).toBe(false);
  });

  it('hits the ship', () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.hits).toBe(1);
  });
});

describe('gameboard', () => {
  let gameBoard, shipStack;
  beforeEach(() => {
    gameBoard = new GameBoard();
    shipStack = gameBoard.shipStack.length;
  });

  it('random ship placement', () => {
    const collision = gameBoard.placeShip();

    expect(gameBoard.ships.length).toBe(1);
    expect(gameBoard.shipStack.length).toBeLessThan(shipStack);
    expect(collision).toBeFalsy();
  });

  it('specified ship placement', () => {
    const collision = gameBoard.placeShip();

    expect(gameBoard.ships.length).toBe(1);
    expect(gameBoard.shipStack.length).toBeLessThan(shipStack);
    expect(collision).toBeFalsy();
  });
});
