import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  find,
  findAll,
  triggerKeyEvent,
  settled,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Animation from 'ember-burger-menu/animations/base';
import triggerSwipeEvent from '../../helpers/trigger-swipe-event';

const template = hbs`
  {{#burger-menu
    translucentOverlay=this.translucentOverlay
    dismissOnClick=this.dismissOnClick
    dismissOnEsc=this.dismissOnEsc
    gesturesEnabled=this.gesturesEnabled
    open=this.open
    locked=this.locked
    width=this.width
    position=this.position
    itemAnimation=this.itemAnimation
    animation=this.animation
    customAnimation=this.customAnimation
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
      color: 'rgb(0, 128, 0)',
    };
  },

  outlet(open, width) {
    return {
      transform: open ? `translate3d(-${width}px, 0, 0)` : '',
    };
  },

  menu() {
    return {
      color: 'rgb(255, 0, 0)',
    };
  },
});

const CustomItemAnimation = Animation.extend({
  itemAnimation: 'custom-animation',

  menuItem(open, width, right, index) {
    return {
      color: open ? `rgb(${index}, 0, 0)` : 'rgb(255, 255, 255)',
    };
  },
});

module('Integration | Component | burger menu', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
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
      gesturesEnabled: true,
    });
  });

  test('it renders', async function (assert) {
    await render(template);

    assert.dom('.bm-menu li').hasText('One', 'Menu has rendered');
    assert.dom('.bm-content').hasText('Content', 'Outlet content rendered');
  });

  test('animation and itemAnimation set correct classes', async function (assert) {
    await render(template);

    this.set('animation', 'push');

    await settled();

    assert
      .dom('.ember-burger-menu')
      .hasClass('bm--push', 'Container has correct animation class');

    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass(
        'bm-item--stack',
        'Menu initially has no item animation class'
      );

    this.set('itemAnimation', 'stack');

    await settled();

    assert
      .dom('.ember-burger-menu')
      .hasClass('bm-item--stack', 'Menu has correct item animation class');
  });

  test('menu options work', async function (assert) {
    await render(template);

    // Open
    assert.false(this.open, 'Open is initially false');
    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is closed');

    this.set('open', true);

    await settled();

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    // Position
    assert
      .dom('.ember-burger-menu')
      .hasClass('left', 'Initial position is left');

    this.set('position', 'right');

    await settled();

    assert
      .dom('.ember-burger-menu')
      .hasClass('right', 'Position was changed to right');

    // Animation
    assert
      .dom('.ember-burger-menu')
      .hasClass('bm--slide', 'Initial animation is slide');

    this.set('animation', 'push');

    await settled();

    assert
      .dom('.ember-burger-menu')
      .hasClass('bm--push', 'Animation was changed to push');
  });

  test('menu state actions work', async function (assert) {
    await render(hbs`
      {{#burger-menu open=this.open dismissOnClick=false as |burger|}}
        {{#burger.menu itemTagName="li" as |menu|}}
          <ul>
            {{#menu.item}}One{{/menu.item}}
            {{#menu.item}}Two{{/menu.item}}
          </ul>
        {{/burger.menu}}

        {{#burger.outlet}}
          <a id="open" {{on "click" burger.state.openMenu}}></a>
          <a id="close" {{on "click" burger.state.closeMenu}}></a>
          <a id="toggle" {{on "click" burger.state.toggleMenu}}></a>
        {{/burger.outlet}}
      {{/burger-menu}}
    `);

    // Open
    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is closed');

    await click('#open');
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    // Close

    await click('#close');
    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is closed');

    // Toggle
    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is closed');

    await click('#toggle');
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await click('#toggle');
    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is closed');
  });

  test('menu opens and closes', async function (assert) {
    await render(template);

    assert.false(this.open, 'Open is initially false');
    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is not open');

    this.set('open', true);
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');
  });

  test('clicking outside of menu closes it -- dismissOnClick = true', async function (assert) {
    this.set('open', true);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await click('.bm-menu li');
    assert
      .dom('.ember-burger-menu')
      .hasClass('is-open', 'Clicking on the menu doesnt close it');

    await click('.bm-content');
    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Clicking in the content closes the menu');
  });

  test('clicking outside of menu doesnt close it -- dismissOnClick = false', async function (assert) {
    this.set('open', true);
    this.set('dismissOnClick', false);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await click('.bm-menu li');
    assert
      .dom('.ember-burger-menu')
      .hasClass('is-open', 'Clicking on the menu doesnt close it');

    await click('.bm-content');
    assert
      .dom('.ember-burger-menu')
      .hasClass('is-open', 'Clicking in the content doesnt close the menu');
  });

  test('clicking outside of locked menu doesnt close it', async function (assert) {
    this.set('open', true);
    this.set('locked', true);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await click('.bm-menu li');
    assert
      .dom('.ember-burger-menu')
      .hasClass('is-open', 'Clicking on the menu doesnt close it');

    await click('.bm-content');
    assert
      .dom('.ember-burger-menu')
      .hasClass('is-open', 'Clicking in the content doesnt close the menu');
  });

  test('pressing ESC closes the menu -- dismissOnEsc = true', async function (assert) {
    this.set('open', true);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await triggerKeyEvent('.bm-outlet', 'keyup', 27);
    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is closed');
  });

  test('pressing ESC doesnt close the menu -- dismissOnEsc = false', async function (assert) {
    this.set('open', true);
    this.set('dismissOnEsc', false);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    triggerKeyEvent('.bm-outlet', 'keyup', 27);
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');
  });

  test('pressing ESC doesnt close a locked menu', async function (assert) {
    this.set('open', true);
    this.set('locked', true);

    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    triggerKeyEvent('.bm-outlet', 'keyup', 27);
    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');
  });

  test('swipe events toggles the menu', async function (assert) {
    await render(template);

    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is not open');

    await triggerSwipeEvent(find('.ember-burger-menu'), 'right');

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await triggerSwipeEvent(find('.bm-menu'), 'left');

    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is not open');

    // Test right sided menu
    this.set('position', 'right');

    await settled();

    await triggerSwipeEvent(find('.ember-burger-menu'), 'left');

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await triggerSwipeEvent(find('.bm-menu'), 'right');

    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is not open');
  });

  test('swipe events dont toggle the menu -- gesturesEnabled = false', async function (assert) {
    this.set('gesturesEnabled', false);
    await render(template);

    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is not open');

    await triggerSwipeEvent(find('.ember-burger-menu'), 'right');

    assert
      .dom('.ember-burger-menu')
      .doesNotHaveClass('is-open', 'Menu is not open');
  });

  test('swipe events dont toggle a locked menu', async function (assert) {
    this.set('open', true);
    this.set('locked', true);
    await render(template);

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');

    await triggerSwipeEvent(find('.ember-burger-menu'), 'left');

    assert.dom('.ember-burger-menu').hasClass('is-open', 'Menu is open');
  });

  test('custom animation', async function (assert) {
    this.set('customAnimation', CustomAnimation);

    await render(template);

    assert
      .dom('.ember-burger-menu')
      .hasClass(
        'bm--custom-animation',
        'Custom container has correct CSS class'
      );
    assert.strictEqual(
      find('.ember-burger-menu').style.color,
      'rgb(0, 128, 0)',
      'Custom container styles applied'
    );
    assert.strictEqual(
      find('.bm-outlet').style.transform,
      '',
      'Custom outlet styles applied'
    );
    assert.strictEqual(
      find('.bm-menu').style.color,
      'rgb(255, 0, 0)',
      'Custom menu styles applied'
    );

    this.set('open', true);

    await settled();

    assert.notEqual(
      find('.bm-outlet').style.transform,
      '',
      'Custom outlet styles applied'
    );
  });

  test('custom item animation', async function (assert) {
    this.set('customAnimation', CustomItemAnimation);

    await render(template);

    assert
      .dom('.ember-burger-menu')
      .hasClass(
        'bm-item--custom-animation',
        'Custom menu has correct CSS class'
      );
    assert.strictEqual(
      find('.bm-menu-item').style.color,
      'rgb(255, 255, 255)',
      'Menu item has no style'
    );

    this.set('open', true);

    await settled();

    assert.strictEqual(
      find('.bm-menu-item').style.color,
      'rgb(0, 0, 0)',
      'Custom menu styles applied'
    );

    let allItems = findAll('.bm-menu-item');

    assert.strictEqual(
      allItems[allItems.length - 1].style.color,
      'rgb(1, 0, 0)',
      'Custom menu styles applied'
    );
  });
});
