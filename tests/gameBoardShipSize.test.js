import GameBoard from '../Models/GameBoard';

describe('gameboard ship size', () => {
  const obj = {};
  beforeEach(() => {
    obj.gameBoard = new GameBoard();
  });

  it('incorrect ship size', () => {
    const isValid = obj.gameBoard.isShipAvailable(8);
    expect(isValid).toBeFalsy();
  });

  it('correct ship size', () => {
    const isValid = obj.gameBoard.isShipAvailable(4);
    expect(isValid).toBeTruthy();
  });

  it('incorrect duplicate ship size', () => {
    obj.gameBoard.placeShip(undefined, 4);
    const isValid = obj.gameBoard.isShipAvailable(4);

    obj.gameBoard.placeShip(undefined, 3);
    const isValid2 = obj.gameBoard.isShipAvailable(3);

    obj.gameBoard.placeShip(undefined, 3);
    const isValid3 = obj.gameBoard.isShipAvailable(3);

    obj.gameBoard.placeShip(undefined, 2);
    const isValid4 = obj.gameBoard.isShipAvailable(5);

    expect(isValid).toBeFalsy();
    expect(isValid2).toBeTruthy();
    expect(isValid3).toBeFalsy();
    expect(isValid4).toBeTruthy();
  });
});
