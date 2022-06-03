import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import State from 'ember-burger-menu/-private/state';

const template = hbs`
  {{#bm-outlet state=this.state}}
    Content
  {{/bm-outlet}}
`;

module('Integration | Component | bm outlet', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      state: State.create(),
    });
  });

  test('it renders', async function (assert) {
    await render(template);
    assert.dom('*').hasText('Content');
  });
});
