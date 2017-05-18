import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Controller.extend({
  queryParams: [
    'animation',
    'itemAnimation',
    'position',
    'locked',
    'translucentOverlay',
    'dismissOnClick',
    'dismissOnEsc',
    'gesturesEnabled'
  ],

  burgerMenu: inject.service(),

  dismissOnClick: false,
  dismissOnEsc: true,
  gesturesEnabled: true,

  menus: [{
    color: 'green',
    position: 'left',
    animation: 'slide'
  }, {
    color: 'yellow',
    position: 'right',
    animation: 'slide'
  }, {
    color: 'blue',
    position: 'left',
    animation: 'fall-down'
  }, {
    color: 'red',
    position: 'right',
    animation: 'fall-down'
  }]
});
