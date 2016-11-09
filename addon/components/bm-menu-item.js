import Ember from 'ember';
import layout from '../templates/components/bm-menu-item';
import computedStyleFor from 'ember-burger-menu/utils/computed-style-for';

const {
  $,
  computed
} = Ember;

export default Ember.Component.extend({
  classNames: ['bm-menu-item'],
  attributeBindings: ['style'],
  layout,

  state: null,
  style: computedStyleFor('menuItem').readOnly(),

  index: computed(function() {
    let $item = this.$();
    return $item ? $('.bm-menu-item', $item.closest('.bm-menu')).index($item) : -1;
  }).volatile()
});
