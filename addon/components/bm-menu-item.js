import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import { computed } from '@ember/object';
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

  index: computed('element', 'menuItems.[]', function () {
    if (isFastboot()) {
      return -1;
    }

    let position = -1;
    const item = this.element;

    if (item) {
      const menu = item.closest('.bm-menu');
      if (menu) {
        position = [].slice
          .call(menu.querySelectorAll('.bm-menu-item'))
          .indexOf(item);
      }
    }

    return position;
  }).readOnly(),

  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this.menuItems, 'addObject', this.elementId);
  },

  willDestroyElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', this.menuItems, 'removeObject', this.elementId);
  },

  click() {
    this._super(...arguments);

    if (this.dismissOnClick) {
      this.get('state').closeMenu();
    }
  },
});
