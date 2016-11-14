import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import MenuState from 'ember-burger-menu/-private/menu-state';

const {
  A: emberArray
} = Ember;

const template = hbs`
  {{#bm-menu-item state=state menuItems=menuItems}}
    Content
  {{/bm-menu-item}}
`;

moduleForComponent('bm-menu-item', 'Integration | Component | bm menu item', {
  integration: true,

  beforeEach() {
    this.setProperties({
      menuItems: emberArray([]),
      state: MenuState.create()
    });
  }
});

test('it renders', function(assert) {
  this.render(template);
  assert.equal(this.$().text().trim(), 'Content');
});
