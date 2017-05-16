import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Animation from 'ember-burger-menu/animations/base';

const {
  run,
  getOwner
} = Ember;

const template = hbs`
  {{#bm-menu
    itemTagName=itemTagName
    state=state
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
      state: getOwner(this).lookup('service:burger-menu').get('states.default'),
      itemTagName: 'li'
    });
  }
});

test('it renders', function(assert) {
  this.render(template);
  assert.ok(this.$('.bm-menu li:contains(One)').length, 'Menu item One exists');
  assert.ok(this.$('.bm-menu li:contains(Two)').length, 'Menu item Two exists');
});

test('menu actions trigger', function(assert) {
  let onOpen = false;
  let onClose = false;

  this.on('onOpen', () => onOpen = true);
  this.on('onClose', () => onClose = true);

  this.render(hbs`
    {{#bm-menu
      onOpen=(action 'onOpen')
      onClose=(action 'onClose')
      state=state
      as |burger|
    }}
    {{/bm-menu}}
  `);

  let state = this.get('state');

  run(() => state.set('open', true));
  assert.ok(onOpen, 'onOpen action was triggered');

  run(() => state.set('open', false));
  assert.ok(onClose, 'onClose action was triggered');
});

test('custom item animation', function(assert) {
  this.render(template);

  let state = this.get('state');

  run(() => state.set('customAnimation', CustomAnimation));

  assert.ok(this.$('.bm-menu').hasClass('bm-item--custom-animation'), 'Custom menu has correct CSS class');
  assert.equal(this.$('.bm-menu-item:first').css('color'), 'rgb(255, 255, 255)', 'Menu item has no style');

  run(() => state.set('open', true));

  assert.equal(this.$('.bm-menu-item:first').css('color'), 'rgb(0, 0, 0)', 'Custom menu styles applied');
  assert.equal(this.$('.bm-menu-item:last').css('color'), 'rgb(1, 0, 0)', 'Custom menu styles applied');
});
