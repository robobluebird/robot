import Component from '@ember/component';

export default Component.extend({
  image: '/assets/images/robot.png',

  robot: null,

  direction: 'east',

  didRender() {
    this._super(...arguments);

    let ourRobot = this.element.querySelector('.robot');

    ourRobot.classList.add(this.get('direction'));
  }
});
