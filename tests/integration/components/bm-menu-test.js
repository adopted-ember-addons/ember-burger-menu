import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import burgerMenu from 'ember-burger-menu';

const {
  run
} = Ember;

const template = hbs`
  {{#bm-menu
    state=state
    itemTagName=itemTagName
    as |menu|
  }}
    {{#menu.item}}One{{/menu.item}}
    {{#menu.item}}Two{{/menu.item}}
  {{/bm-menu}}
`;

let testCount = 0;

moduleForComponent('bm-menu', 'Integration | Component | bm menu', {
  integration: true,

  beforeEach() {
    this.setProperties({
      state: burgerMenu(`_bm_menu_${testCount++}`),
      itemTagName: 'li'
    });
  }
});

test('it renders', function(assert) {
  this.render(template);
  assert.ok(this.$('.bm-menu li:contains(One)').length, 'Menu item One exists');
  assert.ok(this.$('.bm-menu li:contains(Two)').length, 'Menu item Two exists');
});

test('menu state controls rendering', function(assert) {
  this.render(template);

  let state = this.get('state');

  // Item Animation
  assert.ok(this.$('.bm-menu').hasClass('bm-item--none'), 'Initial items have no animation');
  run(() => state.set('itemAnimation', 'push'));
  assert.ok(this.$('.bm-menu').hasClass('bm-item--push'), 'Item animation was changed to push');
});
