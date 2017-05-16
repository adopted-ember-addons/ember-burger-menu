import Ember from 'ember';

const {
  inject,
  computed: { alias, readOnly }
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

  burgerMenu: inject.service(),
  burgerMenuState: readOnly('burgerMenu.states.index'),

  translucentOverlay: true,
  dismissOnClick: true,
  dismissOnEsc: true,
  gesturesEnabled: true,

  animation: alias('burgerMenuState.animation'),
  itemAnimation: alias('burgerMenuState.itemAnimation'),
  position: alias('burgerMenuState.position'),
  locked: alias('burgerMenuState.locked'),

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
      this.get('burgerMenuState').set(...arguments);
    }
  }
});
