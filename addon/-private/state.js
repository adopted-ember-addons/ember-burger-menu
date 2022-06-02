import EmberObject, { computed } from '@ember/object';
import getAnimation from 'ember-burger-menu/animations';

export default EmberObject.extend({
  open: false,
  locked: false,
  width: 300,
  position: 'left',
  animation: 'slide',

  minSwipeDistance: 150,
  maxSwipeTime: 300,

  itemAnimation: null,
  customAnimation: null,

  styles: computed(
    'animation',
    'itemAnimation',
    'customAnimation',
    function () {
      let animation = this.animation;
      let itemAnimation = this.itemAnimation;
      let customAnimation = this.customAnimation;

      return getAnimation(customAnimation || animation, itemAnimation).create();
    }
  ).readOnly(),

  actions: computed('locked', function () {
    return {
      open: () => !this.locked && this.set('open', true),
      close: () => !this.locked && this.set('open', false),
      toggle: () => !this.locked && this.toggleProperty('open'),
    };
  }).readOnly(),
});
