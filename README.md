# Ember Burger Menu

[![Ember Version](https://embadge.io/v1/badge.svg?start=2.3.0)](https://embadge.io/v1/badge.svg?start=2.3.0)
[![Build Status](https://travis-ci.org/offirgolan/ember-burger-menu.svg)](https://travis-ci.org/offirgolan/ember-burger-menu)
[![npm version](https://badge.fury.io/js/ember-burger-menu.svg)](http://badge.fury.io/js/ember-burger-menu)
[![Code Climate](https://codeclimate.com/github/offirgolan/ember-burger-menu/badges/gpa.svg)](https://codeclimate.com/github/offirgolan/ember-burger-menu)
[![Test Coverage](https://codeclimate.com/github/offirgolan/ember-burger-menu/badges/coverage.svg)](https://codeclimate.com/github/offirgolan/ember-burger-menu/coverage)
[![Dependency Status](https://david-dm.org/offirgolan/ember-burger-menu.svg)](https://david-dm.org/offirgolan/ember-burger-menu)

An off-canvas sidebar component with a collection of animations and styles using CSS transitions

## Features

- Easy to use & setup off-canvas menu
- Mix and match from many menu & menu item animations
- Control your menu from anywhere in your app
- Swipe gesture support with changeable thresholds
- Easily create your own animations

## Installation

```
ember install ember-burger-menu
```

## Helpful Links

- ### [Live Demo](http://offirgolan.github.io/ember-burger-menu)

- ### [Changelog](CHANGELOG.md)

## Looking for help?
If it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-burger-menu/issues).

## Animations

### Menu Animations

- slide
- reveal
- push
- fall-down
- open-door
- push-rotate
- rotate-out
- scale-up
- scale-down
- scale-rotate
- slide-reverse

### Menu Item Animations

- push
- stack

## Usage

This addon utilizes contextual components to be able to correctly control and animate necessary elements.

```hbs
{{#burger-menu as |burger|}}
  {{#burger.menu itemTagName="li" as |menu|}}
    <a {{action burger.state.actions.close}} class="icon-close"></a>

    <ul>
      {{#menu.item}}
        {{link-to 'Features' 'features'}}
      {{/menu.item}}

      {{#menu.item}}
        {{link-to 'About' 'about'}}
      {{/menu.item}}

      {{#menu.item}}
        {{link-to 'Contact Us' 'contact'}}
      {{/menu.item}}
    </ul>
  {{/burger.menu}}

  {{#burger.outlet}}
    <a class="icon-menu" {{action burger.state.actions.toggle}}></a>
    {{outlet}}
  {{/burger.outlet}}
{{/burger-menu}}
```

## Components

### `{{burger-menu}}`

#### Options

- #### `open`

  The current open state of the menu.

  **Default: false**

- #### `animation`

  The menu animation. See [Animations](#menu-animations) for the list of available animations.

  **Default: slide**

- #### `itemAnimation`

  The menu item animation. See [Item Animations](#menu-item-animations) for the list of available item animations.

  **Default: null**

- #### `position`

  The menu's open position. Can either be _left_ or _right_

  **Default: left**

- #### `width`

  The menu's width (in px).

  **Default: 300**

- #### `customAnimation`

  Override of the menu's styles with your own implementation. See [Custom Animations](#custom-animations) for more details.

- #### `translucentOverlay`

  Whether the outlet has a translucent overlay over it once the menu is opened.

  **Default: true**

- #### `dismissOnClick`

  Whether the menu can be dismissed when clicking outside of it.

  **Default: true**

- #### `dismissOnEsc`

  Whether the menu can be closed when pressing the ESC key.

  **Default: true**

- #### `minSwipeDistance`

  The minimum distance (in px) the user must swipe to register as valid.

  **Default: 150**

- #### `maxSwipeTime`

  The maximum amount of time (in ms) it must take the user to swipe to be registered as valid .

  **Default: 300**

### `{{burger.outlet}}`

This component is where all your content should be placed.

### `{{burger.menu}}`

Everything rendered here will be inside the menu.

#### Options

- #### `itemTagName`

  The default tagName that will be used by the `{{menu.item}}` component.

  **Default: div**

- #### `dismissOnItemClick`

  Close the menu on click of a `{{menu.item}}`.

  **Default: false**

#### Actions

- #### `onOpen`

  Triggered when the menu is opening

- #### `onClose`

  Triggered when the menu is closing

### `{{menu.item}}`

The individual menu item. This is required if you have specified an [itemAnimation](#itemanimation).

#### Options

- #### `dismissOnClick`

  Close the menu on click.

  **Default: false**

## The Menu State

### Via Component

The `{{burger-menu}}` component exposes multiple contextual components, but it also exposes a state object which allows you to control the state of the menu.

```hbs
{{#burger-menu as |burger|}}
  {{#burger.outlet}}
    <a {{action burger.state.actions.toggle}} class="close fa fa-times"></a>
  {{/burger.outlet}}
{{/burger-menu}}
```

### Via Service

If you need a more programmatic solution, you can grab the menu state via injecting the `burgerMenu` service.

```js
export default Ember.Component.extend({
  burgerMenu: Ember.inject.service()
})
```

### Usage

You can use the menu state object to modify pretty much any property.

- `open`
- `width`
- `position`
- `animation`
- `itemAnimation`
- `customAnimation`

```js
burgerMenu.set('width', 500);
burgerMenu.toggleProperty('open');
```

The state object also exposes some actions.


- #### `open`

  ```hbs
  <button {{action burger.state.actions.open}}>Open</button>
  ```

- #### `close`

  ```hbs
  <button {{action burger.state.actions.close}}>Close</button>
  ```

- #### `toggle`

  ```hbs
  <button {{action burger.state.actions.toggle}}>Toggle</button>
  ```

# Custom Animations

If you're not impressed with the in-house animations and want to create your own, all you have to do is pass the following class to the `customAnimation` property in the `{{burger-menu}}` component. If you think your animation would be a good addition to the existing collection, feel free to open a PR with it!

```js
import Animation from 'ember-burger-menu/animations/base';

export default Animation.extend({
  // CSS class names to be able to target our menu
  animation: 'my-custom-animation',
  itemAnimation: 'my-custom-item-animation',

  container(open, width, right) {
    return {};
  },

  outlet(open, width, right) {
    return {
      transform: open ? right ? `translate3d(-${width}px, 0, 0)` : `translate3d(${width}px, 0, 0)` : ''
    };
  },

  menu(open, width, right) {
    return {};
  },

  menuItem(open, width, right, index) {
    return {
      transform: open ? '' : `translate3d(0, ${(index + 1) * 500}px, 0)`
    };
  }
});

```

_**Note:** You don't need to worry about prefixing your CSS attributes as it will be done for you._

If you need to add some base CSS to your animation, you can target the menu as such:

```sass
.ember-burger-menu.bm--my-custom-animation {
  .bm-menu {}
  .bm-outlet {}

	&.is-open {
    .bm-menu {}
    .bm-outlet {}
  }
}
```

And the menu items as such:

```sass
.ember-burger-menu {
  .bm-menu.bm-item--my-custom-item-animation {
    .bm-menu-item {}
  }

  &.is-open {
    .bm-menu.bm-item--my-custom-item-animation {
      .bm-menu-item {}
    }
  }
}
```

To use our new custom animation, all we have to do is pass the class to
the `customAnimation` option in the `{{burger-menu}}` component.

```js
import MyCustomAnimation from 'path/to/my-custom-animation';

export default Ember.Component.extend({
  MyCustomAnimation
});
```

```hbs
{{#burger-menu customAnimation=MyCustomAnimation}}
  ...
{{/burger-menu}}
```
