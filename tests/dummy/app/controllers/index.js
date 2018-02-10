import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
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

  animations: computed(() => [
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
    'squeeze'
  ]),

  itemAnimations: computed(() => [
    'push',
    'stack'
  ]),

  actions: {
    setMenu() {
      this.set(...arguments);
    }
  }
});
