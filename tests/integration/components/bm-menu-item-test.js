import { run } from '@ember/runloop';
import { A as emberArray } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import State from 'ember-burger-menu/-private/state';

const template = hbs`
  {{#bm-menu-item state=this.state menuItems=this.menuItems dismissOnClick=this.dismissOnClick}}
    Content
  {{/bm-menu-item}}
`;

module('Integration | Component | bm menu item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      menuItems: emberArray([]),
      state: State.create(),
      dismissOnClick: false,
    });
  });

  test('it renders', async function (assert) {
    await render(template);
    assert.dom('*').hasText('Content');
  });

  test('dismissOnClick closes the menu', async function (assert) {
    await render(template);

    let state = this.state;

    run(() => state.set('open', 'true'));
    await click('.bm-menu-item');
    assert.ok(this.get('state.open'), 'Menu should still be open');

    this.set('dismissOnClick', true);
    await click('.bm-menu-item');
    assert.notOk(this.get('state.open'), 'Menu should be closed');
  });

  test('dismissOnClick doesnt close a locked menu', async function (assert) {
    await render(template);

    let state = this.state;

    run(() => state.set('open', true));
    run(() => state.set('locked', true));

    await click('.bm-menu-item');
    assert.ok(this.get('state.open'), 'Menu should still be open');

    this.set('dismissOnClick', true);
    await click('.bm-menu-item');
    assert.ok(this.get('state.open'), 'Menu should still be open');
  });
});
