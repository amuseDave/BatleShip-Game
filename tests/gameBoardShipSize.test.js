import GameBoard from '../Models/GameBoard';

describe('gameboard ship size', () => {
  const obj = {};
  beforeEach(() => {
    obj.gameBoard = new GameBoard(10);
  });

  it("doesn't have ship specified size", () => {
    const isValid = obj.gameBoard.isShipAvailable(100);
    expect(isValid).toBeFalsy();
  });

  it('has ship specified size', () => {
    const isValid = obj.gameBoard.isShipAvailable(4);
    expect(isValid).toBeTruthy();
  });

  it('deletes available ship size', () => {
    expect(obj.gameBoard.availableShips.has(4)).toBeTruthy();
    obj.gameBoard.deleteAvailableShip(4);
    expect(obj.gameBoard.availableShips.has(4)).toBeFalsy();
  });

  it('incorrect specified duplicate ship size', () => {
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
