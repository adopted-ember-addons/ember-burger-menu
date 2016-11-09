import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import MenuState from 'ember-burger-menu/-private/menu-state';

const template = hbs`
  {{#bm-menu-item state=state}}
    Content
  {{/bm-menu-item}}
`;

moduleForComponent('bm-menu-item', 'Integration | Component | bm menu item', {
  integration: true,

  beforeEach() {
    this.setProperties({
      state: MenuState.create()
    });
  }
});

test('it renders', function(assert) {
  this.render(template);
  assert.equal(this.$().text().trim(), 'Content');
});
