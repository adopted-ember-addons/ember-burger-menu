import Ember from 'ember';
import layout from '../templates/components/bm-menu';
import cssStringify from 'ember-burger-menu/utils/css-stringify';

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

  renderInPlace: computed('state.animation', function() {
    return OUTLET_MENU_ANIMATIONS.indexOf(this.get('state.animation')) === -1;
  }).readOnly(),

  style: computed('state.open', 'state.styles', function() {
    let styles = this.get('state.styles');
    let openState = this.get('state.open') ? 'open' : 'closed';
    let width = this.get('state.width');
    let menuStyles = styles[openState].menu;

    menuStyles.width = `${width}px`;

    return cssStringify(menuStyles);
  }).readOnly()
});
