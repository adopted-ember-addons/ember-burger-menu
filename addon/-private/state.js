import EObject, { computed } from '@ember/object';
import getAnimation from 'ember-burger-menu/animations';

export default EObject.extend({
  open: false,
  locked: false,
  width: 300,
  position: 'left',
  animation: 'slide',

  minSwipeDistance: 150,
  maxSwipeTime: 300,

  itemAnimation: null,
  customAnimation: null,

  styles: computed('animation', 'itemAnimation', 'customAnimation', function() {
    let animation = this.get('animation');
    let itemAnimation = this.get('itemAnimation');
    let customAnimation = this.get('customAnimation');

    return getAnimation(customAnimation || animation, itemAnimation).create();
  }).readOnly(),

  actions: computed(function() {
    return {
      open: () => !this.get('locked') && this.set('open', true),
      close: () => !this.get('locked') && this.set('open', false),
      toggle: () => !this.get('locked') && this.toggleProperty('open')
    };
  }).readOnly()
});
