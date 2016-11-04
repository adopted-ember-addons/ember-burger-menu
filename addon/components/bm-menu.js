import Ember from 'ember';
import layout from '../templates/components/bm-menu';
import isPushAnimation from '../utils/is-push-animation';
import cssStringify from 'ember-burger-menu/utils/css-stringify';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  state: null,

  renderInPlace: computed('state.animation', function() {
    return !isPushAnimation(this.get('state.animation'));
  }),

  style: computed('state.isOpen', 'state.styles', function() {
    let openState = this.get('state.isOpen') ? 'open' : 'closed';
    let styles = this.get('state.styles');

    return cssStringify(styles[openState].menu);
  }).readOnly()
});
