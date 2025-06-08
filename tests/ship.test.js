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
});
