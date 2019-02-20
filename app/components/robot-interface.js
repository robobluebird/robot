import Component from '@ember/component';
import Robot from 'robot/models/robot';

export default Component.extend({
  init() {
    this._super(...arguments);

    this.robot = new Robot();
    this.messages = [];
  },

  didRender() {
    this._super(...arguments);

    this.refresh();
  },

  refresh() {
    let ourRobot = this.element.querySelector('.robot');

    if (this.robot.isPlaced()) {
      ourRobot.parentNode.removeChild(ourRobot);

      let newPlace = this.element.querySelector(`.row-${this.robot.y} .data-${this.robot.x}`);

      newPlace.appendChild(ourRobot);

      ourRobot.classList.add('placed');

      ourRobot.classList.remove('north', 'south', 'east', 'west');

      ourRobot.classList.add(this.robot.direction().toLowerCase());
    } else {
      ourRobot.classList.remove('placed');
    }
  },

  actions: {
    command(cmd) {
      let response = this.robot.command(cmd);

      this.get('messages').insertAt(0, cmd.toUpperCase());

      if (response)
        this.get('messages').insertAt(0, response.toUpperCase());

      this.refresh();
    }
  }
});
