import Component from '@ember/component';
import layout from '../templates/components/bm-outlet';
import computedStyleFor from 'ember-burger-menu/computed/style-for';

export default Component.extend({
  layout,
  classNames: ['bm-outlet'],
  attributeBindings: ['style'],
  state: null,
  style: computedStyleFor('outlet').readOnly(),
});
