import Ember from 'ember';
import burgerMenu from 'ember-burger-menu';

export default Ember.Controller.extend({
  burgerMenu: burgerMenu(),
  translucentOverlay: true,
  dismissOnClick: true,
  dismissOnEsc: true
});
