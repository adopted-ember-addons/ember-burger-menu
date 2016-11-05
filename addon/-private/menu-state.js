import Ember from 'ember';
import getAnimationStylesFor from 'ember-burger-menu/animations';

const {
  computed
} = Ember;

export default Ember.Object.extend({
  isOpen: false,
  animation: 'slide',
  width: 300,
  position: 'left',
  styleFn: null,

  actions: computed(function() {
    return {
      toggle: this.toggleProperty.bind(this, 'isOpen')
    };
  }).readOnly(),

  styles: computed('animation', 'width', 'position', 'styleFn', function() {
    return {
      open: getAnimationStylesFor(this, { isOpen: true }),
      closed: getAnimationStylesFor(this, { isOpen: false })
    };
  }).readOnly()
});
