import Player from '../Models/Player';

describe('player', () => {
  it('generate all random ship positions as a non-player ', () => {
    const player = new Player();

    expect(player.gameBoard.availableShips.size).toBeFalsy();
    expect(player.gameBoard.ships.length).toEqual(5);
  });
});
