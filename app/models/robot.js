export default class Robot {
  constructor(x, y, direction) {
    this.x_limit = 5;
    this.y_limit = 5;
    this.directions = ["NORTH", "EAST", "SOUTH", "WEST"];
    this.commands = ["place", "move", "left", "right", "report"];

    this.place(x, y, direction);
  }

  direction() {
    if (typeof this.f === 'number') {
      return this.directions[this.f];
    }
  }

  isPlaced() {
    return typeof this.x === 'number' &&
      typeof this.y === 'number' &&
      typeof this.f === 'number'
  }

  command(commandString) {
    let parts = commandString.split(' ');

    if (parts.length == 0) return;

    let command = parts.shift().toLowerCase();

    if (!this.commands.includes(command)) return;

    let args = [];

    if (parts.length) {
      args = parts.join(' ').split(',').map(elem => elem.trim());
      args[0] = parseInt(args[0]);
      args[1] = parseInt(args[1]);
    }

    return this[command](...args);
  }

  report() {
    return `${this.x},${this.y},${this.directions[this.f]}`;
  }

  place(x, y, direction) {
    let f = this.normalizeDirection(direction);

    if (this.inRange({x: x}) && this.inRange({y: y}) && f >= 0 && f <= 3) {
      this.x = x;
      this.y = y;
      this.f = f;
    }
  }

  move() {
    if (this.f == 0) {
      if (this.inRange({y: this.y + 1})) {
        this.y = this.y + 1;
      }
    } else if (this.f == 2) {
      if (this.inRange({y: this.y - 1})) {
        this.y = this.y - 1;
      }
    } else if (this.f == 1) {
      if (this.inRange({x: this.x + 1})) {
        this.x = this.x + 1;
      }
    } else if (this.f == 3) {
      if (this.inRange({x: this.x - 1})) {
        this.x = this.x - 1;
      }
    }
  }

  left() {
    if (this.f - 1 < 0)
      this.f = 3;
    else
      this.f--;
  }

  right() {
    if (this.f + 1 > 3)
      this.f = 0;
    else
      this.f++;
  }

  normalizeDirection(direction) {
    if (!direction) return;

    return this.directions.indexOf(direction.toUpperCase());
  }

  inRange(obj) {
    let limit;
    let key = Object.keys(obj)[0];

    if (key == 'x')
      limit = this.x_limit;
    else if (key == 'y')
      limit = this.y_limit;
    else
      return

    return obj[key] >= 0 && obj[key] < limit
  }
}
