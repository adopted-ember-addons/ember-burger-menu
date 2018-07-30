import Component from '@ember/component';
import { run } from '@ember/runloop';
import { computed } from '@ember/object';
import layout from '../templates/components/bm-menu-item';
import computedStyleFor from 'ember-burger-menu/computed/style-for';
import isFastboot from 'ember-burger-menu/utils/is-fastboot';
import closest from 'ember-burger-menu/utils/element-closest';

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

    let position = -1;
    const item = this.element;

    if (item) {
      const menu = closest(item, '.bm-menu');
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
    run.scheduleOnce(
      'afterRender',
      this.get('menuItems'),
      'addObject',
      this.get('elementId')
    );
  },

  willDestroyElement() {
    this._super(...arguments);
    run.scheduleOnce(
      'afterRender',
      this.get('menuItems'),
      'removeObject',
      this.get('elementId')
    );
  },

  click() {
    this._super(...arguments);

    if (this.get('dismissOnClick')) {
      this.get('state.actions').close();
    }
  }
});
