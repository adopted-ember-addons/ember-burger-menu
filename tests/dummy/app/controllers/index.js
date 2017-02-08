import Ember from 'ember';

const {
  inject,
  computed: { alias }
} = Ember;

export default Ember.Controller.extend({
  queryParams: [
    'animation',
    'itemAnimation',
    'position',
    'locked',
    'translucentOverlay',
    'dismissOnClick',
    'dismissOnEsc',
    'gesturesEnabled'
  ],

  application: inject.controller(),
  burgerMenu: inject.service(),

  animation: alias('burgerMenu.animation'),
  itemAnimation: alias('burgerMenu.itemAnimation'),
  position: alias('burgerMenu.position'),
  locked: alias('burgerMenu.locked'),

  translucentOverlay: alias('application.translucentOverlay'),
  dismissOnClick: alias('application.dismissOnClick'),
  dismissOnEsc: alias('application.dismissOnEsc'),
  gesturesEnabled: alias('application.gesturesEnabled'),

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
