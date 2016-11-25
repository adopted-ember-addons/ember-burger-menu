import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Animation from 'ember-burger-menu/animations/base';
import MenuState from 'ember-burger-menu/-private/menu-state';
import triggerKeyboardEvent, { KEYS } from '../../helpers/trigger-keyboard-event';
import triggerSwipeEvent from '../../helpers/trigger-swipe-event';

const {
  run
} = Ember;

const template = hbs`
  {{#burger-menu
    translucentOverlay=translucentOverlay
    dismissOnClick=dismissOnClick
    dismissOnEsc=dismissOnEsc
    state=state
    open=open
    as |burger|
  }}
    {{#burger.menu itemTagName="li" as |menu|}}
      <ul>
        {{#menu.item}}One{{/menu.item}}
        {{#menu.item}}Two{{/menu.item}}
      </ul>
    {{/burger.menu}}

    {{#burger.outlet}}Content{{/burger.outlet}}
  {{/burger-menu}}
`;

const CustomAnimation = Animation.extend({
  animation: 'custom-animation',

  container() {
    return {
      color: 'rgb(0, 128, 0)'
    };
  },

  outlet(open, width) {
    return {
      transform: open ? `translate3d(-${width}px, 0, 0)` : ''
    };
  },

  menu() {
    return {
      color: 'rgb(255, 0, 0)'
    };
  }
});

moduleForComponent('burger-menu', 'Integration | Component | burger menu', {
  integration: true,

  beforeEach() {
    this.setProperties({
      open: false,
      translucentOverlay: true,
      dismissOnClick: true,
      dismissOnEsc: true,
      state: MenuState.create()
    });
  }
});

test('it renders', function(assert) {
  this.render(template);

  assert.ok(this.$('.bm-menu li:contains(One)').length, 'Menu has rendered');
  assert.equal(this.$('.bm-content').text().trim(), 'Content', 'Outlet content rendered');
});

test('animation and itemAnimation set correct classes', function(assert) {
  this.render(template);

  let state = this.get('state');

  run(() => state.set('animation', 'push'));
  assert.ok(this.$('.ember-burger-menu').hasClass('bm--push'), 'Container has correct animation class');

  assert.notOk(this.$('.bm-menu').hasClass('bm-item--stack'), 'Menu initially has no item animation class');
  run(() => state.set('itemAnimation', 'stack'));
  assert.ok(this.$('.bm-menu').hasClass('bm-item--stack'), 'Menu has correct item animation class');
});

test('menu state controls rendering', function(assert) {
  this.render(template);

  let state = this.get('state');

  // Open
  assert.equal(state.get('open'), false, 'Open is initialy false');
  assert.notOk(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is closed');
  run(() => state.set('open', true));
  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is open');

  // Position
  assert.ok(this.$('.ember-burger-menu').hasClass('left'), 'Initial position is left');
  run(() => state.set('position', 'right'));
  assert.ok(this.$('.ember-burger-menu').hasClass('right'), 'Position was changed to right');

  // Animation
  assert.ok(this.$('.ember-burger-menu').hasClass('bm--slide'), 'Initial animation is slide');
  run(() => state.set('animation', 'push'));
  assert.ok(this.$('.ember-burger-menu').hasClass('bm--push'), 'Animation was changed to push');
});

test('menu state actions work', function(assert) {
  this.render(template);

  let state = this.get('state');
  let actions = state.get('actions');

  // Toggle
  assert.equal(state.get('open'), false, 'Open is initialy false');
  assert.notOk(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is closed');
  run(() => actions.toggle());
  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is open');
});

test('menu opens and closes', function(assert) {
  this.render(template);

  assert.equal(this.get('open'), false, 'Open is initialy false');
  assert.notOk(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is not open');

  this.set('open', true);
  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is open');
});

test('clicking outside of menu closes it -- dismissOnClick = true', function(assert) {
  this.set('open', true);

  this.render(template);

  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is open');

  run(() => {
    this.$('.bm-menu li:first').click();
  });

  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Clicking on the menu doesnt close it');

  run(() => {
    this.$('.bm-content').click();
  });

  assert.notOk(this.$('.ember-burger-menu').hasClass('is-open'), 'Clicking in the content closes the menu');
});

test('clicking outside of menu doesnt close it -- dismissOnClick = false', function(assert) {
  this.set('open', true);
  this.set('dismissOnClick', false);

  this.render(template);

  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is open');

  run(() => {
    this.$('.bm-menu li:first').click();
  });

  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Clicking on the menu doesnt close it');

  run(() => {
    this.$('.bm-content').click();
  });

  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Clicking in the content doesnt close the menu');
});

test('pressing ESC closes the menu -- dismissOnEsc = true', function(assert) {
  this.set('open', true);

  this.render(template);

  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is open');

  run(() => {
    triggerKeyboardEvent(this.$(), 'keyup', KEYS.ESCAPE);
  });

  assert.notOk(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is closed');
});

test('pressing ESC doesnt close the menu -- dismissOnEsc = false', function(assert) {
  this.set('open', true);
  this.set('dismissOnEsc', false);

  this.render(template);

  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is open');

  run(() => {
    triggerKeyboardEvent(this.$(), 'keyup', KEYS.ESCAPE);
  });

  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is open');
});

test('swipe events toggles the menu', function(assert) {
  this.render(template);

  assert.notOk(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is not open');

  run(() => {
    triggerSwipeEvent(this.$('.ember-burger-menu'), 'right');
  });

  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is open');

  run(() => {
    triggerSwipeEvent(this.$('.bm-menu'), 'left');
  });

  assert.notOk(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is not open');

  // Test right sided menu
  run(() => {
    this.set('state.position', 'right');
  });

  run(() => {
    triggerSwipeEvent(this.$('.ember-burger-menu'), 'left');
  });

  assert.ok(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is open');

  run(() => {
    triggerSwipeEvent(this.$('.bm-menu'), 'right');
  });

  assert.notOk(this.$('.ember-burger-menu').hasClass('is-open'), 'Menu is not open');
});

test('custom animation', function(assert) {
  this.render(template);

  let state = this.get('state');

  run(() => state.set('customAnimation', CustomAnimation));

  assert.ok(this.$('.ember-burger-menu').hasClass('bm--custom-animation'), 'Custom container has correct CSS class');
  assert.equal(this.$('.ember-burger-menu').css('color'), 'rgb(0, 128, 0)', 'Custom container styles applied');
  assert.equal(this.$('.bm-outlet').css('transform'), 'none', 'Custom outlet styles applied');
  assert.equal(this.$('.bm-menu').css('color'), 'rgb(255, 0, 0)', 'Custom menu styles applied');

  run(() => state.set('open', true));

  assert.notEqual(this.$('.bm-outlet').css('transform'), 'none', 'Custom outlet styles applied');
});
