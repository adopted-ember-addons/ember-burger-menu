import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Animation from 'ember-burger-menu/animations/base';
import triggerSwipeEvent from '../../helpers/trigger-swipe-event';

const template = hbs`
  {{#burger-menu
    translucentOverlay=translucentOverlay
    dismissOnClick=dismissOnClick
    dismissOnEsc=dismissOnEsc
    gesturesEnabled=gesturesEnabled
    open=open
    locked=locked
    width=width
    position=position
    itemAnimation=itemAnimation
    animation=animation
    customAnimation=customAnimation
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

const CustomItemAnimation = Animation.extend({
  itemAnimation: 'custom-animation',

  menuItem(open, width, right, index) {
    return {
      color: open ? `rgb(${index}, 0, 0)` : 'rgb(255, 255, 255)'
    };
  }
});

module('Integration | Component | burger menu', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setProperties({
      open: false,
      locked: false,
      width: 300,
      position: 'left',
      animation: 'slide',
      itemAnimation: null,
      customAnimation: null,
      translucentOverlay: true,
      dismissOnClick: true,
      dismissOnEsc: true,
      gesturesEnabled: true
    });
  });

  test('it renders', async function(assert) {
    await render(template);

    assert.ok(this.$('.bm-menu li:contains(One)').length, 'Menu has rendered');
    assert.dom('.bm-content').hasText('Content', 'Outlet content rendered');
  });

  test('animation and itemAnimation set correct classes', async function(assert) {
    await render(template);

    run(() => this.set('animation', 'push'));
    assert
      .dom('.ember-burger-menu')
      .hasClass('bm--push', 'Container has correct animation class');

    assert
      .dom('.ember-burger-menu')
      .hasNoClass(
        'bm-item--stack',
        'Menu initially has no item animation class'
      );

    run(() => this.set('itemAnimation', 'stack'));
    assert
      .dom('.ember-burger-menu')
      .hasClass('bm-item--stack', 'Menu has correct item animation class');
  });

  test('menu options work', async function(assert) {
    await render(template);

    // Open
    assert.equal(this.get('open'), false, 'Open is initialy false');
    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is closed');

    run(() => this.set('open', true));
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    // Position
    assert
      .dom('.ember-burger-menu')
      .hasClass('left', 'Initial position is left');

    run(() => this.set('position', 'right'));
    assert
      .dom('.ember-burger-menu')
      .hasClass('right', 'Position was changed to right');

    // Animation
    assert
      .dom('.ember-burger-menu')
      .hasClass('bm--slide', 'Initial animation is slide');

    run(() => this.set('animation', 'push'));
    assert
      .dom('.ember-burger-menu')
      .hasClass('bm--push', 'Animation was changed to push');
  });

  test('menu state actions work', async function(assert) {
    await render(hbs`
      {{#burger-menu open=open dismissOnClick=false as |burger|}}
        {{#burger.menu itemTagName="li" as |menu|}}
          <ul>
            {{#menu.item}}One{{/menu.item}}
            {{#menu.item}}Two{{/menu.item}}
          </ul>
        {{/burger.menu}}

        {{#burger.outlet}}
          <a id="open" {{action burger.state.actions.open}}></a>
          <a id="close" {{action burger.state.actions.close}}></a>
          <a id="toggle" {{action burger.state.actions.toggle}}></a>
        {{/burger.outlet}}
      {{/burger-menu}}
    `);

    // Open
    assert.equal(this.get('open'), false, 'Open is initialy false');
    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is closed');

    await click('#open');
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    // Close
    assert.equal(this.get('open'), true, 'Open is initialy true');
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await click('#close');
    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is closed');

    // Toggle
    assert.equal(this.get('open'), false, 'Open is initialy false');
    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is closed');

    await click('#toggle');
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await click('#toggle');
    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is closed');
  });

  test('menu opens and closes', async function(assert) {
    await render(template);

    assert.equal(this.get('open'), false, 'Open is initialy false');
    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is not open');

    this.set('open', true);
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');
  });

  test('clicking outside of menu closes it -- dismissOnClick = true', async function(assert) {
    this.set('open', true);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await click(this.$('.bm-menu li:first')[0]);
    assert
      .dom('.ember-burger-menu')
      .hasClass('is-open', 'Clicking on the menu doesnt close it');

    await click('.bm-content');
    assert
      .dom('.ember-burger-menu')
      .hasNoClass('is-open', 'Clicking in the content closes the menu');
  });

  test('clicking outside of menu doesnt close it -- dismissOnClick = false', async function(assert) {
    this.set('open', true);
    this.set('dismissOnClick', false);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await click(this.$('.bm-menu li:first')[0]);
    assert
      .dom('.ember-burger-menu')
      .hasClass('is-open', 'Clicking on the menu doesnt close it');

    await click('.bm-content');
    assert
      .dom('.ember-burger-menu')
      .hasClass('is-open', 'Clicking in the content doesnt close the menu');
  });

  test('clicking outside of locked menu doesnt close it', async function(assert) {
    this.set('open', true);
    this.set('locked', true);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await click(this.$('.bm-menu li:first')[0]);
    assert
      .dom('.ember-burger-menu')
      .hasClass('is-open', 'Clicking on the menu doesnt close it');

    await click('.bm-content');
    assert
      .dom('.ember-burger-menu')
      .hasClass('is-open', 'Clicking in the content doesnt close the menu');
  });

  test('pressing ESC closes the menu -- dismissOnEsc = true', async function(assert) {
    this.set('open', true);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await triggerKeyEvent('.bm-outlet', 'keyup', 27);
    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is closed');
  });

  test('pressing ESC doesnt close the menu -- dismissOnEsc = false', async function(assert) {
    this.set('open', true);
    this.set('dismissOnEsc', false);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    triggerKeyEvent('.bm-outlet', 'keyup', 27);
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');
  });

  test('pressing ESC doesnt close a locked menu', async function(assert) {
    this.set('open', true);
    this.set('locked', true);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    triggerKeyEvent('.bm-outlet', 'keyup', 27);
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');
  });

  test('swipe events toggles the menu', async function(assert) {
    await render(template);

    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is not open');

    run(() => {
      triggerSwipeEvent(this.$('.ember-burger-menu'), 'right');
    });

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    run(() => {
      triggerSwipeEvent(this.$('.bm-menu'), 'left');
    });

    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is not open');

    // Test right sided menu
    run(() => {
      this.set('position', 'right');
    });

    run(() => {
      triggerSwipeEvent(this.$('.ember-burger-menu'), 'left');
    });

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    run(() => {
      triggerSwipeEvent(this.$('.bm-menu'), 'right');
    });

    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is not open');
  });

  test('swipe events dont toggle the menu -- gesturesEnabled = false', async function(assert) {
    this.set('gesturesEnabled', false);
    await render(template);

    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is not open');

    run(() => {
      triggerSwipeEvent(this.$('.ember-burger-menu'), 'right');
    });

    assert.dom('.ember-burger-menu').hasNoClass('is-open', 'Menu is not open');
  });

  test('swipe events dont toggle a locked menu', async function(assert) {
    this.set('open', true);
    this.set('locked', true);
    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    run(() => {
      triggerSwipeEvent(this.$('.ember-burger-menu'), 'left');
    });

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');
  });

  test('custom animation', async function(assert) {
    this.set('customAnimation', CustomAnimation);

    await render(template);

    assert
      .dom('.ember-burger-menu')
      .hasClass(
        'bm--custom-animation',
        'Custom container has correct CSS class'
      );
    assert.equal(
      this.$('.ember-burger-menu').css('color'),
      'rgb(0, 128, 0)',
      'Custom container styles applied'
    );
    assert.equal(
      this.$('.bm-outlet').css('transform'),
      'none',
      'Custom outlet styles applied'
    );
    assert.equal(
      this.$('.bm-menu').css('color'),
      'rgb(255, 0, 0)',
      'Custom menu styles applied'
    );

    run(() => this.set('open', true));

    assert.notEqual(
      this.$('.bm-outlet').css('transform'),
      'none',
      'Custom outlet styles applied'
    );
  });

  test('custom item animation', async function(assert) {
    this.set('customAnimation', CustomItemAnimation);

    await render(template);

    assert
      .dom('.ember-burger-menu')
      .hasClass(
        'bm-item--custom-animation',
        'Custom menu has correct CSS class'
      );
    assert.equal(
      this.$('.bm-menu-item:first').css('color'),
      'rgb(255, 255, 255)',
      'Menu item has no style'
    );

    run(() => this.set('open', true));

    assert.equal(
      this.$('.bm-menu-item:first').css('color'),
      'rgb(0, 0, 0)',
      'Custom menu styles applied'
    );
    assert.equal(
      this.$('.bm-menu-item:last').css('color'),
      'rgb(1, 0, 0)',
      'Custom menu styles applied'
    );
  });
});
