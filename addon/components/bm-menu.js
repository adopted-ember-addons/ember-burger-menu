import Component from '@ember/component';
import { observer, computed } from '@ember/object';
import { A as emberArray } from '@ember/array';
import layout from '../templates/components/bm-menu';
import computedStyleFor from 'ember-burger-menu/computed/style-for';

export const OUTLET_MENU_ANIMATIONS = [
  'push',
  'rotate-out',
  'squeeze'
];

export default Component.extend({
  layout,
  state: null,

  classNames: ['bm-menu-container'],

  itemTagName: 'div',
  dismissOnItemClick: false,

  onOpen() {},
  onClose() {},

  style: computedStyleFor('menu').readOnly(),

  renderInPlace: computed('state.animation', function() {
    return OUTLET_MENU_ANIMATIONS.indexOf(this.get('state.animation')) === -1;
  }).readOnly(),

  menuItems: computed(function() {
    return emberArray([]);
  }).readOnly(),

  onOpenChange: observer('state.open', function() {
    this[this.get('state.open') ? 'onOpen' : 'onClose']();
  })
});
