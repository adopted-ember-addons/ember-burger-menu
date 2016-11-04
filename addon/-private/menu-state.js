import Ember from 'ember';
import getEffectStylesFor from 'ember-burger-menu/animations';

const {
  computed
} = Ember;

export default Ember.Object.extend({
  isOpen: false,
  animation: 'slide',
  width: 300,
  position: 'left',

  actions: computed(function() {
    return {
      toggle: this.toggleProperty.bind(this, 'isOpen')
    };
  }).readOnly(),

  styles: computed('animation', 'width', 'position', function() {
    let { animation, width, position } = this.getProperties(['animation', 'width', 'position']);
    let isRight = position === 'right';

    return {
      open: getEffectStylesFor(animation, true, width, isRight),
      closed: getEffectStylesFor(animation, false, width, isRight)
    };
  }).readOnly()
});
