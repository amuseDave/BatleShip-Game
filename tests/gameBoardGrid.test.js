import GameBoard from '../Models/GameBoard';

describe('utils', () => {
  it('copies game board grid', () => {
    const gameBoard = GameBoard.createGrid(6);
    const copiedGrid = GameBoard.copyGrid(gameBoard);

    expect(gameBoard).not.toBe(copiedGrid);
    expect(gameBoard.get(0)).not.toBe(copiedGrid.get(0));

    expect(gameBoard).toStrictEqual(copiedGrid);
    expect(gameBoard.get(0)).toStrictEqual(copiedGrid.get(0));
  });

  it('creates game board grid with specified sizes', () => {
    const gameBoardSize = 4;
    const gameBoard = GameBoard.createGrid(4);

    for (let i = 0; i < gameBoardSize; i++) {
      for (let j = 0; i < gameBoardSize; i++) {
        expect(gameBoard.get(i).has(j));
      }
    }

    const gameBoardSize2 = 5;
    const gameBoard2 = GameBoard.createGrid(5);

    for (let i = 0; i < gameBoardSize2; i++) {
      for (let j = 0; i < gameBoardSize2; i++) {
        expect(gameBoard2.get(i).has(j));
      }
    }
  });
});
