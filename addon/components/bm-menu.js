import Ember from 'ember';
import layout from '../templates/components/bm-menu';
import computedStyleFor from 'ember-burger-menu/utils/computed-style-for';

const {
  computed
} = Ember;

export const OUTLET_MENU_ANIMATIONS = [
  'push',
  'rotate-out'
];

export default Ember.Component.extend({
  layout,
  state: null,

  itemTagName: 'div',
  style: computedStyleFor('menu').readOnly(),

  renderInPlace: computed('state.animation', function() {
    return OUTLET_MENU_ANIMATIONS.indexOf(this.get('state.animation')) === -1;
  }).readOnly()
});
