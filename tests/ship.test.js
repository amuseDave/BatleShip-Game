import Ship from '../Models/Ship';

describe('ship', () => {
  const obj = {};
  beforeEach(() => {
    obj.ship = new Ship(3);
  });

  it('does sink if hits >= length', () => {
    obj.ship.hit();
    obj.ship.hit();
    obj.ship.hit();
    expect(obj.ship.isSunk()).toBe(true);
  });
  it('does not sink if hits < length', () => {
    obj.ship.hit();
    obj.ship.hit();
    expect(obj.ship.isSunk()).toBe(false);
  });

  it('increments hits when hit is called', () => {
    obj.ship.hit();
    obj.ship.hit();
    expect(obj.ship.hits).toBe(2);
  });

  it('does not have any hits', () => {
    expect(obj.ship.hits).toBe(0);
  });

  it('create a ship with specified length', () => {
    obj.ship = new Ship(4);
    expect(obj.ship.length).toEqual(4);

    obj.ship = new Ship(5);
    expect(obj.ship.length).toEqual(5);

    obj.ship = new Ship(3);
    expect(obj.ship.length).toEqual(3);
  });
});
