import Player from '../Models/Player';

describe('player', () => {
  it('generate all random ship positions as a non-player ', () => {
    const player = new Player();
    const availableShips = [...player.gameBoard.availableShips].reduce(
      (prevVal, acc) => prevVal + acc[1],
      0
    );
    expect(player.gameBoard.ships.length).toEqual(availableShips);
  });
});
