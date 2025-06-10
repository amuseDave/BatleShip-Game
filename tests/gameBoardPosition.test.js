import GameBoard from '../Models/GameBoard';

describe('gameboard position', () => {
  const obj = {};

  beforeEach(() => {
    obj.gameBoard = new GameBoard(10);
    obj.validPositions = obj.gameBoard.validPositions;
  });

  it('gets random start valid gameboard grid position', () => {
    const [x, y] = GameBoard.getRandomPosition(obj.validPositions);

    expect(obj.validPositions.has(x)).toBeTruthy();
    expect(obj.validPositions.get(x).has(y)).toBeTruthy();
  });
  it('finds valid position coords based on the start position', () => {
    const [x, y] = GameBoard.getRandomPosition(obj.validPositions);
    const shipSize = 3;

    const validX = obj.gameBoard.getValidXPath(shipSize, x, y);
    const validY = obj.gameBoard.getValidYPath(shipSize, x, y);

    expect(validX.length).toBeTruthy();
    expect(validY.length).toBeTruthy();

    const isValidX =
      validX[0].y[0] === y &&
      validX[0].y[1] === y &&
      validX[0].x[0] === x &&
      (validX[0].x[1] === x - shipSize + 1 || validX[0].x[1] === x + shipSize - 1);

    const isValidY =
      validY[0].x[0] === x &&
      validY[0].x[1] === x &&
      validY[0].y[0] === y &&
      (validY[0].y[1] === y - shipSize + 1 || validY[0].y[1] === y + shipSize - 1);

    let isValidX2 = true;

    for (let i = x; i < x + shipSize - 1; i++) {
      if (!obj.validPositions.get(x).has(y)) isValidX2 = false;
    }
    for (let i = x; i > x - shipSize + 1; i--) {
      if (!obj.validPositions.get(x).has(y)) isValidX2 = false;
    }

    let isValidY2 = true;

    for (let i = y; i < y + shipSize - 1; i++) {
      if (!obj.validPositions.get(x).has(y)) isValidY2 = false;
    }
    for (let i = y; i > y - shipSize + 1; i--) {
      if (!obj.validPositions.get(x).has(y)) isValidY2 = false;
    }

    expect(isValidX).toBeTruthy();
    expect(isValidY).toBeTruthy();
    expect(isValidX2).toBeTruthy();
    expect(isValidY2).toBeTruthy();
  });

  it('finds random valid gameboard ship placement coords', () => {
    const spy1 = jest.spyOn(GameBoard, 'getRandomPosition');
    const spy2 = jest.spyOn(obj.gameBoard, 'getValidXPath');
    const spy3 = jest.spyOn(obj.gameBoard, 'getValidYPath');

    const coords = obj.gameBoard.getRandomCoords(3);

    expect(coords).toBeTruthy();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it('itteratively lowers copied positions grid size until no valid position left or is found', () => {
    obj.gameBoard = new GameBoard(10);
    const coords = obj.gameBoard.getRandomCoords(11);

    expect(coords).toBeFalsy();
    expect(obj.gameBoard.copiedValidPosGrid.size).toBeFalsy();
  });

  it('deletes Y axis grid position', () => {
    expect(obj.validPositions.get(4).has(4)).toBeTruthy();
    GameBoard.deleteGridPos(4, 4, obj.validPositions);
    expect(obj.validPositions.get(4).has(4)).toBeFalsy();
  });

  it('deletes X axis grid position', () => {
    expect(obj.validPositions.has(4)).toBeTruthy();
    for (let i = 0; i < obj.gameBoard.size; i++) {
      GameBoard.deleteGridPos(4, i, obj.validPositions);
    }
    expect(obj.validPositions.has(4)).toBeFalsy();
  });

  it('validates grid position', () => {
    expect(GameBoard.validateGridPos(0, 0, obj.validPositions)).toBeTruthy();
    expect(GameBoard.validateGridPos(11, 2, obj.validPositions)).toBeFalsy();
  });
});
