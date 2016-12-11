import Ember from 'ember';
import layout from '../templates/components/bm-outlet';
import computedStyleFor from 'ember-burger-menu/computed/style-for';

const {
  inject: { service }
} = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['bm-outlet'],
  attributeBindings: ['style'],
  state: service('burgerMenu'),
  style: computedStyleFor('outlet').readOnly()
});
