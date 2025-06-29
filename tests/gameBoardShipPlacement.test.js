import GameBoard from '../Models/GameBoard';

describe('gameboard ship placement', () => {
  const obj = {};

  beforeEach(() => {
    obj.gameBoard = new GameBoard(10);
  });

  it('random ship placement', () => {
    const error = obj.gameBoard.placeShip();

    expect(obj.gameBoard.ships.length).toBe(1);
    expect(error).toBeFalsy();
  });
  it('random ship placement with size', () => {
    const error = obj.gameBoard.placeShip(undefined, 3);

    expect(obj.gameBoard.ships.length).toBe(1);
    expect(error).toBeFalsy();
  });

  it('correct specified ship placement', () => {
    const error = obj.gameBoard.placeShip({ x: [4, 4], y: [6, 9] }, 4);

    expect(obj.gameBoard.ships.length).toBe(1);
    expect(error).toBeFalsy();
  });

  it('incorrect specified ship size', () => {
    const error = obj.gameBoard.placeShip({ x: [4, 4], y: [6, 9] }, 6);

    expect(obj.gameBoard.ships.length).toBe(0);
    expect(error).toBeTruthy();
  });

  it('specified ship size duplicate change pos', () => {
    const error = obj.gameBoard.placeShip({ x: [4, 4], y: [6, 9] }, 4);
    const error2 = obj.gameBoard.placeShip({ x: [4, 7], y: [5, 5] }, 4);

    expect(obj.gameBoard.ships.length).toBe(1);
    expect(error).toBeTruthy();
    expect(error2).toBeTruthy();
  });

  it('incorrect specified ship placement out of bounds', () => {
    const error = obj.gameBoard.placeShip({ x: [8, 10], y: [7, 7] }, 3);

    expect(obj.gameBoard.ships.length).toBe(0);
    expect(error).toBeTruthy();
  });

  it('incorrect specified ship placement collision', () => {
    const error = obj.gameBoard.placeShip({ x: [4, 4], y: [6, 8] }, 3);
    const error2 = obj.gameBoard.placeShip({ x: [2, 6], y: [6, 6] }, 5);

    expect(obj.gameBoard.ships.length).toBe(1);
    expect(error).toBeFalsy();
    expect(error2).toBeTruthy();
  });

  it('incorrect specified not matching size position placement', () => {
    const error = obj.gameBoard.placeShip({ x: [4, 4], y: [8, 8] }, 3);

    expect(obj.gameBoard.ships.length).toBe(0);
    expect(error).toBeTruthy();
  });
});
