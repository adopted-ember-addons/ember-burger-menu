import Ember from 'ember';
import layout from '../templates/components/bm-menu';
import computedStyleFor from 'ember-burger-menu/computed/style-for';

const {
  computed,
  observer,
  A: emberArray,
  inject: { service }
} = Ember;

export const OUTLET_MENU_ANIMATIONS = [
  'push',
  'rotate-out'
];

export default Ember.Component.extend({
  layout,
  state: service('burgerMenu'),

  itemTagName: 'div',
  dismissOnItemClick: false,

  style: computedStyleFor('menu').readOnly(),

  renderInPlace: computed('state.animation', function() {
    return OUTLET_MENU_ANIMATIONS.indexOf(this.get('state.animation')) === -1;
  }).readOnly(),

  menuItems: computed(function() {
    return emberArray([]);
  }).readOnly(),

  onOpenChange: observer('state.open', function() {
    let actionName = this.get('state.open') ? 'onOpen' : 'onClose';
    this.sendAction(actionName);
  })
});
