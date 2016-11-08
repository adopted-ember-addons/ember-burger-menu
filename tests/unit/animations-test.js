import getAnimationStylesFor from 'ember-burger-menu/animations';
import { module, test } from 'qunit';

const ANIMATIONS = [
  'slide',
  'reveal',
  'push',
  'fall-down',
  'open-door',
  'push-rotate',
  'rotate-out',
  'scale-up',
  'scale-down',
  'scale-rotate',
  'slide-reverse'
];

const STYLES = [
  'container',
  'outlet',
  'menu'
];

module('Unit | Animations');

test('all animations', function(assert) {
  ANIMATIONS.forEach((a) => {
    let styles = getAnimationStylesFor(a);

    STYLES.forEach((s) => {
      let fn = styles[s];
      assert.ok(!fn || fn && typeof fn === 'function', `${a}.${s} is a fn`);

      if (fn) {
        let style = fn(false, 300, false);
        assert.ok(style && typeof style === 'object', `${a}.${s} returned a style object`);
      }
    });
  });
});
