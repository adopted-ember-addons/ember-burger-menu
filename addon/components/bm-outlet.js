import Ember from 'ember';
import layout from '../templates/components/bm-outlet';
import cssStringify from 'ember-burger-menu/utils/css-stringify';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['bm-outlet'],
  attributeBindings: ['style'],

  state: null,

  style: computed('state.open', 'state.styles', function() {
    let openState = this.get('state.open') ? 'open' : 'closed';
    let styles = this.get('state.styles');

    return cssStringify(styles[openState].outlet);
  }).readOnly()
});
