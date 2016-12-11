import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import MenuState from 'ember-burger-menu/-private/menu-state';

const {
  run,
  A: emberArray
} = Ember;

const template = hbs`
  {{#bm-menu-item state=state menuItems=menuItems dismissOnClick=dismissOnClick}}
    Content
  {{/bm-menu-item}}
`;

moduleForComponent('bm-menu-item', 'Integration | Component | bm menu item', {
  integration: true,

  beforeEach() {
    this.setProperties({
      menuItems: emberArray([]),
      state: MenuState.create(),
      dismissOnClick: false
    });
  }
});

test('it renders', function(assert) {
  this.render(template);
  assert.equal(this.$().text().trim(), 'Content');
});

test('dismissOnClick closes the menu', function(assert) {
  this.render(template);

  let state = this.get('state');

  run(() => state.set('open', 'true'));
  this.$('.bm-menu-item').click();
  assert.ok(this.get('state.open'), 'Menu should still be open');

  this.set('dismissOnClick', true);
  this.$('.bm-menu-item').click();
  assert.notOk(this.get('state.open'), 'Menu should be closed');
});
