import getAnimation from 'ember-burger-menu/animations';
import { module, test } from 'qunit';

const ANIMATIONS = [
  'slide',
  'squeeze',
  'reveal',
  'push',
  'fall-down',
  'open-door',
  'push-rotate',
  'rotate-out',
  'scale-up',
  'scale-down',
  'scale-rotate',
  'slide-reverse',
];

const ITEM_ANIMATIONS = ['push', 'stack'];

const STYLES = ['container', 'outlet', 'menu', 'menuItem'];

module('Unit | Animations', function () {
  test('all animations', function (assert) {
    ANIMATIONS.forEach((a) => {
      let animation = getAnimation(a).create();

      STYLES.forEach((s) => {
        let fn = animation[s];
        assert.ok(fn && typeof fn === 'function', `${a}.${s} is a fn`);

        let style = fn(false, 300, false);
        assert.ok(
          style && typeof style === 'object',
          `${a}.${s} returned a style object`
        );
      });
    });
  });

  test('item animation are mixed in', function (assert) {
    let animation = getAnimation(ANIMATIONS[0]).create();

    assert.deepEqual(animation.menuItem(), {});

    animation = getAnimation(ANIMATIONS[0], ITEM_ANIMATIONS[0]).create();
    assert.notDeepEqual(animation.menuItem(), {});
  });
});
