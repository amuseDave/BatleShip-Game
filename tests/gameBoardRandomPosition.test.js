import GameBoard from '../Models/GameBoard';

describe('gameboard random position', () => {
  const obj = {};

  beforeEach(() => {
    obj.gameBoard = new GameBoard();
    obj.validPositions = obj.gameBoard.validPositions;
  });

  it('gets random valid grid position', () => {
    const [x, y] = obj.gameBoard.getRandomPosition(obj.validPositions);

    expect(obj.gameBoard.validPositions.has(x)).toBeTruthy();
    expect(obj.gameBoard.validPositions.get(x).has(y)).toBeTruthy();
  });
  it('place random position', () => {});
});
