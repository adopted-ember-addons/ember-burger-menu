import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import State from 'ember-burger-menu/-private/state';

const template = hbs`
  {{#bm-menu
    itemTagName=this.itemTagName
    state=this.state
    as |menu|
  }}
    {{#menu.item}}One{{/menu.item}}
    {{#menu.item}}Two{{/menu.item}}
  {{/bm-menu}}
`;

module('Integration | Component | bm menu', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(function () {
    this.setProperties({
      state: State.create(),
      itemTagName: 'li',
    });
  });

  test('it renders', async function (assert) {
    await render(template);
    assert
      .dom(findAll('.bm-menu li')[0])
      .hasText('One', 'Menu item One exists');
    assert
      .dom(findAll('.bm-menu li')[1])
      .hasText('Two', 'Menu item Two exists');
  });

  test('menu actions trigger', async function (assert) {
    let onOpen = false;
    let onClose = false;

    this.actions.onOpen = () => (onOpen = true);
    this.actions.onClose = () => (onClose = true);

    await render(hbs`
      {{#bm-menu
        onOpen=(action 'onOpen')
        onClose=(action 'onClose')
        state=this.state
        as |burger|
      }}
      {{/bm-menu}}
    `);

    let state = this.state;

    run(() => state.set('open', true));
    assert.ok(onOpen, 'onOpen action was triggered');

    run(() => state.set('open', false));
    assert.ok(onClose, 'onClose action was triggered');
  });
});
