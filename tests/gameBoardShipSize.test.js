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
    expect(obj.gameBoard.isShipAvailable(4)).toBeTruthy();
    obj.gameBoard.deleteAvailableShip(4);
    expect(obj.gameBoard.isShipAvailable(4)).toBeFalsy();
  });
});
