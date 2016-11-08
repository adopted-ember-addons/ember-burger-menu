import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import burgerMenu from 'ember-burger-menu';

const template = hbs`
  {{#bm-menu-item state=state}}
    Content
  {{/bm-menu-item}}
`;

let testCount = 0;

moduleForComponent('bm-menu-item', 'Integration | Component | bm menu item', {
  integration: true,

  beforeEach() {
    this.setProperties({
      state: burgerMenu(`_bm_menu_item_${testCount++}`)
    });
  }
});

test('it renders', function(assert) {
  this.render(template);
  assert.equal(this.$().text().trim(), 'Content');
});
