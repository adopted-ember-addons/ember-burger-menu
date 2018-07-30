# Changelog

## v3.2.0

### Pull Requests

- [#109](https://github.com/offirgolan/ember-burger-menu/pull/109) Remove usage of jquery in components *by [@josemarluedke](https://github.com/josemarluedke)*

## v3.1.0

### Pull Requests

- [#100](https://github.com/offirgolan/ember-burger-menu/pull/100) Upgrade to Ember 2.18 *by [@mixonic](https://github.com/mixonic)*
- [#104](https://github.com/offirgolan/ember-burger-menu/pull/104) Update all the things


## v3.0.2

### Pull Requests

- [#102](https://github.com/offirgolan/ember-burger-menu/pull/102) Update ember-cli-dependency-checker

## v3.0.1

### Pull Requests

- [#98](https://github.com/offirgolan/ember-burger-menu/pull/98) Fix for lifeline selector issue *by [@donaldwasserman](https://github.com/donaldwasserman)*

## v3.0.0

### Pull Requests

- [#88](https://github.com/offirgolan/ember-burger-menu/pull/88) Better Sass *by [@offirgolan](https://github.com/offirgolan)*

### Release Notes

- Hard dependency on sass (now required in the host application)
  - Allows to override various variables
  - Allows to selective import only the sass files you need
- More fine grain selector matching to support multi-level nested burger menus
- **[BREAKING]** `slide-shrink` renamed to `squeeze`
- **[BREAKING]** Menu item class has now been moved to the top level `ember-burger-menu` element. It can now be accessed via `.ember-burger-menu.bm-item--stack`
- **[BREAKING]** Please see [Custom Animations](https://github.com/offirgolan/ember-burger-menu#custom-animations) for the new sass structure for custom animations

## v2.0.1

### Pull Requests

- [#80](https://github.com/offirgolan/ember-burger-menu/pull/80) Fastboot *by [@mayko780](https://github.com/mayko780)*

## v2.0.0

### Pull Requests

- [#79](https://github.com/offirgolan/ember-burger-menu/pull/79) [FEATURE] Multiple Menu Support *by [@offirgolan](https://github.com/offirgolan)*

### Release Notes

- Multiple menus can now co-exist in your application
- Improved event listeners
- **[BREAKING]** Removed `burger-menu` service as it was used to back a single menu state and no longer makes sense to have.
- **[BREAKING]** When the menu is in a `locked` state, actions can no longer change the state of the menu.
- **[BREAKING]** The default height is no longer set to `100vh`, instead it is set to `100%`. If you upgrade and your menu is no longer visible, please check the available viewport height.

## v1.1.3

### Pull Requests

- [#69](https://github.com/offirgolan/ember-burger-menu/pull/69) [BUGFIX] Remove preventDefault from passive event listener touchMove *by [@offirgolan](https://github.com/offirgolan)*

## v1.1.2

### Pull Requests

- [#62](https://github.com/offirgolan/ember-burger-menu/pull/62) [FEATURE] Slide Shrink Animation *by [@offirgolan](https://github.com/offirgolan)*

## v1.1.1

### Pull Requests

- [#42](https://github.com/offirgolan/ember-burger-menu/pull/42) Update ember-cli-sass to the latest version 🚀 *by [@offirgolan/greenkeeper](https://github.com/offirgolan/greenkeeper)*

## v1.1.0

### Pull Requests

- [#29](https://github.com/offirgolan/ember-burger-menu/pull/29) [FEATURE] Locked + gesturesEnabled + use ember-lifeline *by [@offirgolan](https://github.com/offirgolan)*

## v1.0.2

### Pull Requests

- [#21](https://github.com/offirgolan/ember-burger-menu/pull/21) Make height 100vh *by [@rwwagner90](https://github.com/rwwagner90)*

## v1.0.1

### Pull Requests

- [#13](https://github.com/offirgolan/ember-burger-menu/pull/13) [BUGFIX] Use originalEvent to access touches *by [@offirgolan](https://github.com/offirgolan)*

## v1.0.0

### Pull Requests

- [#10](https://github.com/offirgolan/ember-burger-menu/pull/10) [FEATURE] Dismiss menu on item click *by [@offirgolan](https://github.com/offirgolan)*
- [#11](https://github.com/offirgolan/ember-burger-menu/pull/11) [FEATURE] Use a service to hold the menu state *by [@offirgolan](https://github.com/offirgolan)*

## v0.2.1

### Pull Requests

- [#6](https://github.com/offirgolan/ember-burger-menu/pull/6) [FEATURE] Add open and close state actions *by [@offirgolan](https://github.com/offirgolan)*
- Add ability to use a customAnimation with a specified itemAnimation
- Some general code cleanup

## v0.2.0

### Pull Requests

- [#4](https://github.com/offirgolan/ember-burger-menu/pull/4) [FEATURE] Swipe Support *by [@offirgolan](https://github.com/offirgolan)*

## v0.1.0

- Initial release
