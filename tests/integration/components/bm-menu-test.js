import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import State from 'ember-burger-menu/-private/state';

const template = hbs`
  {{#bm-menu
    itemTagName=itemTagName
    state=state
    as |menu|
  }}
    {{#menu.item}}One{{/menu.item}}
    {{#menu.item}}Two{{/menu.item}}
  {{/bm-menu}}
`;

module('Integration | Component | bm menu', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(function() {
    this.setProperties({
      state: State.create(),
      itemTagName: 'li'
    });
  });

  test('it renders', async function(assert) {
    await render(template);
    assert.ok(this.$('.bm-menu li:contains(One)').length, 'Menu item One exists');
    assert.ok(this.$('.bm-menu li:contains(Two)').length, 'Menu item Two exists');
  });

  test('menu actions trigger', async function(assert) {
    let onOpen = false;
    let onClose = false;

    this.actions.onOpen = () => onOpen = true;
    this.actions.onClose = () => onClose = true;

    await render(hbs`
      {{#bm-menu
        onOpen=(action 'onOpen')
        onClose=(action 'onClose')
        state=state
        as |burger|
      }}
      {{/bm-menu}}
    `);

    let state = this.get('state');

    run(() => state.set('open', true));
    assert.ok(onOpen, 'onOpen action was triggered');

    run(() => state.set('open', false));
    assert.ok(onClose, 'onClose action was triggered');
  });
});
