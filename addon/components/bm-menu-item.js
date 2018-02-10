import $ from 'jquery';
import { run } from '@ember/runloop';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/bm-menu-item';
import computedStyleFor from 'ember-burger-menu/computed/style-for';
import isFastboot from 'ember-burger-menu/utils/is-fastboot';

export default Component.extend({
  layout,
  classNames: ['bm-menu-item'],
  attributeBindings: ['style'],

  state: null,

  menuItems: null,
  dismissOnClick: false,
  style: computedStyleFor('menuItem').readOnly(),

  index: computed('menuItems.[]', function() {
    if (isFastboot()) {
      return -1;
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
