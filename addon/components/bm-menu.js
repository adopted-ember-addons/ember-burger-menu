import Ember from 'ember';
import layout from '../templates/components/bm-menu';
import cssStringify from 'ember-burger-menu/utils/css-stringify';

const {
  computed,
  canInvoke,
  assign
} = Ember;

export const OUTLET_MENU_ANIMATIONS = [
  'push',
  'rotate-out'
];

export default Ember.Component.extend({
  layout,
  state: null,

  itemTagName: 'div',
  itemAnimation: computed.alias('state.itemAnimation'),
  itemStyles: computed.alias('state.itemStyles'),

  renderInPlace: computed('state.animation', function() {
    return OUTLET_MENU_ANIMATIONS.indexOf(this.get('state.animation')) === -1;
  }).readOnly(),

  style: computed('state.{styles,open,width,isRight}', function() {
    let state = this.get('state');
    let { styles, open, width, isRight } = state.getProperties(['styles', 'open', 'width', 'isRight']);
    let style = { width: `${width}px` };

    if (canInvoke(styles, 'menu')) {
      assign(style, styles.menu(open, width, isRight));
    }

    return cssStringify(style);
  }).readOnly()
});
