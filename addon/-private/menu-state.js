import Ember from 'ember';
import getAnimationStylesFor from 'ember-burger-menu/animations';

const {
  isEmpty,
  computed
} = Ember;

export default Ember.Object.extend({
  open: false,
  width: 300,
  position: 'left',
  animation: 'slide',
  itemAnimation: null,

  isRight: computed.equal('position', 'right').readOnly(),

  actions: computed(function() {
    return {
      toggle: this.toggleProperty.bind(this, 'open')
    };
  }).readOnly(),

  styles: computed('animation', function() {
    let animation = this.get('animation');
    return getAnimationStylesFor(animation);
  }),

  itemStyles: computed('itemAnimation', function() {
    let itemAnimation = this.get('itemAnimation');
    return isEmpty(itemAnimation) ? {} : getAnimationStylesFor(`menu-item/${itemAnimation}`);
  })
});
