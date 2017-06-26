import Ember from 'ember';
import getAnimation from 'ember-burger-menu/animations';

const {
  computed,
  deprecate
} = Ember;

export default Ember.Object.extend({
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

    if (animation === 'slide-shrink') {
      deprecate('[ember-burger-menu] The animation \'slide-shrink\' has been renamed to \'squeeze\'.',
                false,
                { id: 'bm.item.slide-shrink', until: '2.0.0' });
      animation = 'squeeze';
    }

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
