import Ember from 'ember';
import getAnimation from 'ember-burger-menu/animations';

const {
  typeOf,
  computed
} = Ember;

export default Ember.Object.extend({
  open: false,
  width: 300,
  position: 'left',
  animation: 'slide',
  itemAnimation: null,
  customAnimation: null,

  styles: computed('animation', 'itemAnimation', 'customAnimation', function() {
    let animation = this.get('animation');
    let itemAnimation = this.get('itemAnimation');
    let customAnimation = this.get('customAnimation');
    let AnimationClass;

    if (typeOf(customAnimation) === 'class' && customAnimation.__isAnimation__) {
      AnimationClass = customAnimation;
    } else {
      AnimationClass = getAnimation(animation, itemAnimation);
    }

    return AnimationClass.create();
  }).readOnly(),

  actions: computed(function() {
    return {
      toggle: this.toggleProperty.bind(this, 'open')
    };
  }).readOnly()
});
