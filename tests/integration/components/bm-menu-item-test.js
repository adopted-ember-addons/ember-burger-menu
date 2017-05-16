import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  run,
  getOwner,
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
      state: getOwner(this).lookup('service:burger-menu').get('states.default'),
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

test('dismissOnClick doesnt close a locked menu', function(assert) {
  this.render(template);

  let state = this.get('state');

  run(() => state.set('open', true));
  run(() => state.set('locked', true));

  this.$('.bm-menu-item').click();
  assert.ok(this.get('state.open'), 'Menu should still be open');

  this.set('dismissOnClick', true);
  this.$('.bm-menu-item').click();
  assert.ok(this.get('state.open'), 'Menu should still be open');
});
