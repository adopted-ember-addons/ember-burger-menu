// import Ember from 'ember';
import MenuState from 'ember-burger-menu/-private/menu-state';

// const {
//   assert,
//   isEmpty
// } = Ember;

// const Menus = {};
//
// export default function burgerMenu(id = 'main') {
//   assert('The passed id must be a string', typeof id === 'string');
//   assert('The passed id cannot be null, undefined, or an empty string', !isEmpty(id));
//
//   if (!Menus[id]) {
//     Menus[id] = MenuState.create({ id });
//   }
//
//   return Menus[id];
// }

export default MenuState.create();
