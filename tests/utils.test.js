import { getElement, getRandomElement } from '../utils';

describe('utility functions', () => {
  const arr = [1, 2, 3, 4, 5, 6];

  it('gets random element', () => {
    const [el, idx] = getRandomElement(arr);
    expect(arr[idx] === el && arr[idx] !== undefined).toBeTruthy();
  });
  it('gets specified element', () => {
    const [el, idx] = getElement(arr, 3);
    expect(arr[idx] === el && arr[idx] !== undefined).toBeTruthy();
  });
  it("doesn't find specified element", () => {
    const el = getElement(arr, 7);
    expect(el).toBeFalsy();
  });
});
