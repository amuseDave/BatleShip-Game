class Ship {
  constructor(length) {
    this.length = length;
    this.id = crypto.randomUUID();
    this.hits = 0;
    this.coords = new Set();
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }

  static buildDOM(ships) {
    const DOM_SHIPS = [];
    for (const { length, id } of ships) {
      const div = document.createElement('div');

      div.dataset.id = id;
      div.dataset.length = length;

      div.classList.add('ship');
      div.style.width = `calc(4.2rem * ${length})`;
      div.style.height = '2.8rem';

      DOM_SHIPS.push(div);
    }
    return DOM_SHIPS;
  }
}

export default Ship;
