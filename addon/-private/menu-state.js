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
  customStyles: null,

  styles: computed('animation', 'itemAnimation', 'customStyles', function() {
    let animation = this.get('animation');
    let itemAnimation = this.get('itemAnimation');
    let customStyles = this.get('customStyles');
    let AnimationClass;

    if (typeOf(customStyles) === 'class' && customStyles.__isAnimation__) {
      AnimationClass = customStyles;
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
