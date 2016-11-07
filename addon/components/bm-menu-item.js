import Ember from 'ember';
import layout from '../templates/components/bm-menu-item';
import cssStringify from 'ember-burger-menu/utils/css-stringify';

const {
  $,
  computed,
  canInvoke
} = Ember;

export default Ember.Component.extend({
  classNames: ['bm-menu-item'],
  attributeBindings: ['style'],
  layout,

  state: null,

  $index: computed(function() {
    let $item = this.$();
    return $item ? $('.bm-menu-item', $item.closest('.bm-menu')).index($item) : -1;
  }).volatile(),

  style: computed('state.{itemStyles,open,width,isRight}', function() {
    let state = this.get('state');
    let { itemStyles, open, width, isRight } = state.getProperties(['itemStyles', 'open', 'width', 'isRight']);
    let $index = this.get('$index');

    if (canInvoke(itemStyles, 'menuItem')) {
      return cssStringify(itemStyles.menuItem(open, width, isRight, $index));
    }
  }).readOnly()
});
