import { copyGameBoardGrid, copyGrid, createGameBoardGrid } from '../utils';

describe('utils', () => {
  it('copies game board grid', () => {
    const gameBoard = createGameBoardGrid(6);
    const copiedGrid = copyGameBoardGrid(gameBoard);

    expect(gameBoard).not.toBe(copiedGrid);
    expect(gameBoard[0]).not.toBe(copiedGrid[0]);
    expect(gameBoard[0][1]).not.toBe(copiedGrid[0][1]);

    expect(gameBoard).toStrictEqual(copiedGrid);
    expect(gameBoard[0]).toStrictEqual(copiedGrid[0]);
    expect(gameBoard[0][1]).toStrictEqual(copiedGrid[0][1]);
  });

  it('creates game board grid', () => {
    const gameBoard = createGameBoardGrid(4);
    expect(gameBoard.length).toBe(4);
    expect(gameBoard[0].length).toBe(2);
    expect(gameBoard[0][1].size).toBe(4);
  });
});
