import { copyGameBoardGrid, copyGrid, createGameBoardGrid } from '../utils';

describe('utils', () => {
  it('copies game board grid', () => {
    const gameBoard = createGameBoardGrid(6);
    const copiedGrid = copyGameBoardGrid(gameBoard);

    expect(gameBoard).not.toBe(copiedGrid);
    expect(gameBoard.get(0)).not.toBe(copiedGrid.get(0));

    expect(gameBoard).toStrictEqual(copiedGrid);
    expect(gameBoard.get(0)).toStrictEqual(copiedGrid.get(0));
  });

  it('creates game board grid', () => {
    const gameBoard = createGameBoardGrid(4);
    expect(gameBoard.size).toBe(4);
    expect(gameBoard.get(0).size).toBe(4);
    expect(gameBoard.get(0).has(3)).toBeTruthy();
  });
});
