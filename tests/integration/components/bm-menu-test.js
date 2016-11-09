import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Animation from 'ember-burger-menu/animations/base';
import MenuState from 'ember-burger-menu/-private/menu-state';

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

const CustomAnimation = Animation.extend({
  itemAnimation: 'custom-animation',

  menuItem(open, width, right, index) {
    return {
      color: open ? `rgb(${index}, 0, 0)` : 'rgb(255, 255, 255)'
    };
  }
});

moduleForComponent('bm-menu', 'Integration | Component | bm menu', {
  integration: true,

  beforeEach() {
    this.setProperties({
      state: MenuState.create(),
      itemTagName: 'li'
    });
  }
});

test('it renders', function(assert) {
  this.render(template);
  assert.ok(this.$('.bm-menu li:contains(One)').length, 'Menu item One exists');
  assert.ok(this.$('.bm-menu li:contains(Two)').length, 'Menu item Two exists');
});

test('custom item styles override', function(assert) {
  this.render(template);

  let state = this.get('state');

  run(() => state.set('customStyles', CustomAnimation));

  assert.ok(this.$('.bm-menu').hasClass('bm-item--custom-animation'), 'Custom menu has correct CSS class');
  assert.equal(this.$('.bm-menu-item:first').css('color'), 'rgb(255, 255, 255)', 'Menu item has no style');

  run(() => state.set('open', true));

  assert.equal(this.$('.bm-menu-item:first').css('color'), 'rgb(0, 0, 0)', 'Custom menu styles applied');
  assert.equal(this.$('.bm-menu-item:last').css('color'), 'rgb(1, 0, 0)', 'Custom menu styles applied');
});
