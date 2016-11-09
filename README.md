# Ember Burger Menu

[![Ember Version](https://embadge.io/v1/badge.svg?start=2.3.0)](https://embadge.io/v1/badge.svg?start=2.3.0)
[![Build Status](https://travis-ci.org/offirgolan/ember-burger-menu.svg)](https://travis-ci.org/offirgolan/ember-burger-menu)
[![npm version](https://badge.fury.io/js/ember-burger-menu.svg)](http://badge.fury.io/js/ember-burger-menu)
[![Code Climate](https://codeclimate.com/github/offirgolan/ember-burger-menu/badges/gpa.svg)](https://codeclimate.com/github/offirgolan/ember-burger-menu)
[![Test Coverage](https://codeclimate.com/github/offirgolan/ember-burger-menu/badges/coverage.svg)](https://codeclimate.com/github/offirgolan/ember-burger-menu/coverage)
[![Dependency Status](https://david-dm.org/offirgolan/ember-burger-menu.svg)](https://david-dm.org/offirgolan/ember-burger-menu)

An off-canvas sidebar component with a collection of animations and styles using CSS transitions

## Features

- Easy to use / easy to build off-canvas menu
- Mix and match from many menu & menu item animations
- Control your menu from anywhere in your app
- Support for multiple menus
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

## Usage

This addon utilizes contextual components to be able to correctly control and animate necessary elements.

```hbs
{{#ember-burger as |burger|}}
  {{#burger.menu itemTagName="li" as |menu|}}
    <a {{action burger.state.actions.toggle}} class="close fa fa-times"></a>
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
    <a class="fa fa-bars" {{action burger.state.actions.toggle}}></a>
    {{outlet}}
  {{/burger.outlet}}
{{/ember-burger}}
```

## Components

### `{{ember-burger}}`

#### Options

##### `open`

The current open state of the  menu.

**Default: false**

##### `animation`

The menu animation. See [Animations](#animations) for the list of available animations.

**Default: slide**

##### `position`

The menu's open position. Can either be _left_ or _right_

**Default: left**

##### `width`

The menu' width (in px).

**Default: 300**

##### `styles`

Override of the menu's styles. See [Custom Styles](#custom-styles) for more details.

##### `translucentOverlay`

Whether the menu has a translucent overlay once opened.

**Default: true**

##### `dismissOnClick`

Whether the menu can be dismissed when clicking outside of it.

**Default: true**

##### `dismissOnEsc`

Whether the menu can be dismissed when pressing the ESC key.

**Default: true**

##### `menuId`

The menu's ID. If you have more than one menu, you will need to set this to a unique value.

**Default: main**


### `{{burger.outlet}}`

This component is where all your content should be placed.

### `{{burger.menu}}`

Everything rendered here will be inside the menu.

#### Options

##### `itemAnimation`

The menu item animation. See [Animations](#menu-item-animations) for the list of available animations.

**Default: null**

##### `itemTagName`

The default tagName that will be used by the `{{menu.item}}` component.

**Default: div**

##### `itemStyles`

Override of the menu item's styles. See [Custom Menu Item Styles](#custom-menu-item-styles) for more details.

### `{{menu.item}}`

This component is only needed when using an [item animation](#itemanimation).

## The Menu State

### Via Component

The `{{ember-burger}}` component exposed multiple contextual components, but it also exposes a state object which allows you to control the state of the menu.

```hbs
{{#ember-burger as |burger|}}
  {{#burger.menu itemTagName="li" as |menu|}}
    <a {{action burger.state.actions.toggle}} class="close fa fa-times"></a>
{{/ember-burger}}
```

### Via Import

If you need a more programmatic solution, you can grab the menu state via a simple import.

```js
import burgerMenu from 'ember-burger-menu';

// Using the default menuId
const myMenu = burgerMenu();

// With a specific menuId
const fooMenu = burgerMenu('foo');
```

### Usage

You can use the menu state object to modify pretty much any property.

- `open`
- `width`
- `position`
- `animation`
- `itemAnimation`
- `styles`
- `itemStyles`

```js
myMenu.set('width', 500);
myMenu.toggleProperty('open');
```

The state object also exposes some actions.

- `toggle`

```hbs
{{#unless myMenu.open}}
  <button {{action myMenu.actions.toggle}}>Open</button>
{{/unless}}
```

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

# Custom Styles

If you're not impressed with the in-house animations and want to create your own, all you have to do is pass the following object to the `styles` property in the `{{ember-burger}}` component.

```js
export default {
  container(open, width, right) {
    return {
      cssAttr: value
    };
  },

  outlet(open, width, right) {
    return {
      transform: open ? right ? `translate3d(-${width}px, 0, 0)` : `translate3d(${width}px, 0, 0)` : ''
    };
  },

  menu(open, width, right) {
    return {};
  }
};
```

**Note:** You don't need to worry about prefixing your CSS attributes as it will be done for you.

If you need to add some base CSS to your animation, you target it as such:

```sass
.ember-burger-menu.bm--MY-CUSTOM-ANIMATION {
  .bm-menu {}
  .bm-outlet {}

	&.is-open {
    .bm-menu {}
    .bm-outlet {}
	}
}
```

## Custom Menu Item Styles

The process to create custom menu item styles is almost identical as mentioned above. All you have to do is pass the following object to the `itemStyles` property in the `{{burger.menu}}` component.

```js
export default {
  menuItem(open, width, right, index) {
    return {
      transform: open ? '' : `translate3d(0, ${(index + 1) * 500}px, 0)`
    };
  }
};
```

**Note:** You don't need to worry about prefixing your CSS attributes as it will be done for you.

If you need to add some base CSS to your animation, you target it as such:

```sass
.ember-burger-menu {
  .bm-menu.bm-item--MY-CUSTOM-ITEM-ANIMATION {
    .bm-menu-item {}
  }

	&.is-open {
		.bm-menu.bm-item--MY-CUSTOM-ITEM-ANIMATION {
			.bm-menu-item {}
		}
	}
}
```
