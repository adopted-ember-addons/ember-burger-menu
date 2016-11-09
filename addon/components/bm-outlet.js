import Ember from 'ember';
import layout from '../templates/components/bm-outlet';
import computedStyleFor from 'ember-burger-menu/utils/computed-style-for';

export default Ember.Component.extend({
  classNames: ['bm-outlet'],
  attributeBindings: ['style'],
  layout,

  state: null,
  style: computedStyleFor('outlet').readOnly()
});
