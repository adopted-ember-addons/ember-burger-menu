import Ember from 'ember';
import getAnimationStylesFor from 'ember-burger-menu/animations';

const {
  assign,
  isEmpty,
  computed
} = Ember;

export default Ember.Object.extend({
  open: false,
  width: 300,
  position: 'left',
  animation: 'slide',
  menuItemAnimation: null,

  isRight: computed.equal('position', 'right').readOnly(),

  actions: computed(function() {
    return {
      toggle: this.toggleProperty.bind(this, 'open')
    };
  }).readOnly(),

  styles: computed('animation', 'menuItemAnimation', function() {
    let { animation, menuItemAnimation } = this.getProperties(['animation', 'menuItemAnimation']);
    let styles = getAnimationStylesFor(animation);
    let menuItemStyles = {};

    if (!isEmpty(menuItemAnimation)) {
      menuItemStyles = getAnimationStylesFor(`menu-item/${menuItemAnimation}`);
    }

    return assign({}, styles, menuItemStyles);
  })
});
