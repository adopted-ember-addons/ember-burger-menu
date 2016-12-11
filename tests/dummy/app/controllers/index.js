import Ember from 'ember';

const {
  inject,
  computed
} = Ember;

export default Ember.Controller.extend({
  queryParams: [
    'animation',
    'itemAnimation',
    'position',
    'translucentOverlay',
    'dismissOnClick',
    'dismissOnEsc'
  ],

  application: inject.controller(),
  burgerMenu: inject.service(),

  animation: computed.alias('burgerMenu.animation'),
  itemAnimation: computed.alias('burgerMenu.itemAnimation'),
  position: computed.alias('burgerMenu.position'),

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
    'scale-up',
    'scale-down',
    'scale-rotate',
    'slide-reverse'
  ],

  itemAnimations: [
    'push',
    'stack'
  ],

  actions: {
    setMenu() {
      this.get('burgerMenu').set(...arguments);
    }
  }
});
