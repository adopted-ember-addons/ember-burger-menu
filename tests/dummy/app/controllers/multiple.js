import Ember from 'ember';

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

  dismissOnClick: false,
  dismissOnEsc: true,
  gesturesEnabled: true,

  menus: [{
    open: false,
    color: 'green',
    position: 'left',
    animation: 'slide'
  }, {
    open: false,
    color: 'yellow',
    position: 'right',
    animation: 'slide'
  }, {
    open: false,
    color: 'blue',
    position: 'left',
    animation: 'fall-down'
  }, {
    open: false,
    color: 'red',
    position: 'right',
    animation: 'fall-down'
  }]
});
