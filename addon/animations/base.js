import EmberObject from '@ember/object';
import { assert } from '@ember/debug';
import cssStringify from 'ember-burger-menu/utils/css-stringify';

const Animation = EmberObject.extend({
  animation: null,
  itemAnimation: null,

  container(/* open, width, right */) {
    return {};
  },

  outlet(/* open, width, right */) {
    return {};
  },

  menu(/* open, width, right */) {
    return {};
  },

  menuItem(/* open, width, right, index */) {
    return {};
  },

  generateCSSFor(type, { open, width, position, index }) {
    let result;

    assert('Width must be a number.', typeof width === 'number');
    assert(
      "Position must be either 'left' or 'right'.",
      position === 'left' || position === 'right'
    );

    if (type === 'menuItem' && index === -1) {
      /*
        If the index is -1 that means the specific menu item hasnt been
        rendered yet or it isn't found.
       */
      result = {};
    } else {
      result = this[type](open, width, position === 'right', index);
    }

    if (type === 'menu') {
      Object.assign(result, { width: `${width}px` });
    }

    return cssStringify(result);
  },
});

Animation.reopenClass({
  __isAnimation__: true,
});

export default Animation;
