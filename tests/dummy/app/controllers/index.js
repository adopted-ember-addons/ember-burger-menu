import Ember from 'ember';

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

  translucentOverlay: true,
  dismissOnClick: true,
  dismissOnEsc: true,
  gesturesEnabled: true,

  animation: 'slide',
  itemAnimation: null,
  position: 'left',
  locked: false,

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
    'slide-reverse',
    'slide-shrink'
  ],

  itemAnimations: [
    'push',
    'stack'
  ],

  actions: {
    setMenu() {
      this.set(...arguments);
    }
  }
});
