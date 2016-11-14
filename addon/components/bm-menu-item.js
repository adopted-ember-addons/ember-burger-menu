import Ember from 'ember';
import layout from '../templates/components/bm-menu-item';
import computedStyleFor from 'ember-burger-menu/utils/computed-style-for';

const {
  $,
  run,
  computed
} = Ember;

export default Ember.Component.extend({
  classNames: ['bm-menu-item'],
  attributeBindings: ['style'],
  layout,

  state: null,
  style: computedStyleFor('menuItem').readOnly(),
  menuItems: null,

  index: computed('menuItems.[]', function() {
    let $item = this.$();
    return $item ? $('.bm-menu-item', $item.closest('.bm-menu')).index($item) : -1;
  }).readOnly(),

  didInsertElement() {
    this._super(...arguments);
    run.scheduleOnce('afterRender', this.get('menuItems'), 'addObject', this.get('elementId'));
  },

  willDestroyElement() {
    this._super(...arguments);
    run.scheduleOnce('afterRender', this.get('menuItems'), 'removeObject', this.get('elementId'));
  }
});
