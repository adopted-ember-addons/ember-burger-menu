import Ember from 'ember';
import layout from '../templates/components/bm-menu-item';
import computedStyleFor from 'ember-burger-menu/computed/style-for';

const {
  $,
  run,
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['bm-menu-item'],
  attributeBindings: ['style'],

  state: null,

  menuItems: null,
  dismissOnClick: false,
  style: computedStyleFor('menuItem').readOnly(),

  index: computed('menuItems.[]', function() {
    if (!self.document) {
      return;
    }
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
  },

  click() {
    this._super(...arguments);

    if (this.get('dismissOnClick')) {
      this.get('state.actions').close();
    }
  }
});
