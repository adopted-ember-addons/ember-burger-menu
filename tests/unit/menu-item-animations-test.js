import getAnimation from 'ember-burger-menu/animations';
import { module, test } from 'qunit';

const ANIMATIONS = ['push', 'stack'];

const STYLES = ['menuItem'];

module('Unit | Menu Item Animations', function () {
  test('all menu item animations', function (assert) {
    ANIMATIONS.forEach((a) => {
      let styles = getAnimation('slide', a);

      STYLES.forEach((s) => {
        let fn = styles[s];
        assert.ok(!fn || (fn && typeof fn === 'function'), `${a}.${s} is a fn`);

        if (fn) {
          let style = fn(false, 300, false);
          assert.ok(
            style && typeof style === 'object',
            `${a}.${s} returned a style object`
          );
        }
      });
    });
  });
});
