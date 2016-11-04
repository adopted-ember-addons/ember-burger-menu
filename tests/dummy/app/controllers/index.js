import Ember from 'ember';
import menuFor from 'ember-burger-menu';

export default Ember.Controller.extend({
  burgerMenu: menuFor('main'),

  animations: [
    'slide',
    'reveal',
    'push',
    'fall-down',
    'open-door',
    'push-rotate',
    'rotate-out',
    'scale-down',
    'scale-rotate',
    'scale-up',
    'slide-reverse'
  ],

  actions: {
    setMenu() {
      this.get('burgerMenu').set(...arguments);
    }
  }
});
