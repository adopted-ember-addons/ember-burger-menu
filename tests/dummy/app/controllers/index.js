import Ember from 'ember';
import burgerMenu from 'ember-burger-menu';

const {
  inject,
  computed
} = Ember;

export default Ember.Controller.extend({
  application: inject.controller(),
  burgerMenu: burgerMenu('main'),

  translucentOverlay: computed.alias('application.translucentOverlay'),
  dismissOnClick: computed.alias('application.dismissOnClick'),
  dismissOnEsc: computed.alias('application.dismissOnEsc'),

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
