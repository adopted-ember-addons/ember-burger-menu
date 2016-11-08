import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import burgerMenu from 'ember-burger-menu';

const template = hbs`
  {{#bm-outlet state=state}}
    Content
  {{/bm-outlet}}
`;

let testCount = 0;

moduleForComponent('bm-outlet', 'Integration | Component | bm outlet', {
  integration: true,

  beforeEach() {
    this.setProperties({
      state: burgerMenu(`_bm_outlet_${testCount++}`)
    });
  }
});

test('it renders', function(assert) {
  this.render(template);
  assert.equal(this.$().text().trim(), 'Content');
});
