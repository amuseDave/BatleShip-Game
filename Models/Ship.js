class Ship {
  constructor(length) {
    this.length = length;
    this.id = crypto.randomUUID();
    this.hits = 0;
    this.coords = new Set();
    this.DOM = this.createDOM();
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
  createDOM() {
    const div = document.createElement('div');

    div.dataset.id = this.id;
    div.dataset.length = this.length;
    div.dataset.direction = 'horizontal';

    div.classList.add('ship');
    div.style.width = `calc(4.2rem * ${this.length})`;
    div.style.height = '2.8rem';

    return div;
  }
}

export default Ship;
