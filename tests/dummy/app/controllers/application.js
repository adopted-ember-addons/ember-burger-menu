import Ember from 'ember';
import menuFor from 'ember-burger-menu';

export default Ember.Controller.extend({
  burgerMenu: menuFor('main'),
  translucentOverlay: true,
  dismissOnClick: true
});
