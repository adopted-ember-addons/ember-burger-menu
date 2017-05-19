import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import State from 'ember-burger-menu/-private/state';

const template = hbs`
  {{#bm-outlet state=state}}
    Content
  {{/bm-outlet}}
`;

moduleForComponent('bm-outlet', 'Integration | Component | bm outlet', {
  integration: true,

  beforeEach() {
    this.setProperties({
      state: State.create()
    });
  }
});

test('it renders', function(assert) {
  this.render(template);
  assert.equal(this.$().text().trim(), 'Content');
});
