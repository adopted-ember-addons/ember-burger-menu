import Ember from 'ember';
import burgerMenu from 'ember-burger-menu';

export default Ember.Controller.extend({
  burgerMenu: burgerMenu('main'),
  translucentOverlay: true,
  dismissOnClick: true,
  dismissOnEsc: true
});
