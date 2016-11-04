import Ember from 'ember';
import menuFor from 'ember-burger-menu';

export default Ember.Controller.extend({
  burgerMenu: menuFor('main'),

  actions: {
    toggleMenu() {
      this.get('burgerMenu').toggleProperty('isOpen');
    }
  }
});
