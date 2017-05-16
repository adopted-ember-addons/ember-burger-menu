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

  colors: [
    'green',
    'yellow',
    'blue',
    'red'
  ]
});
