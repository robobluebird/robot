import Component from '@ember/component';

export default Component.extend({
  inputAction: '',

  value: '',

  actions: {
    handleInput() {
      this.command(this.value);
      this.set('value', '');
    }
  }
});
