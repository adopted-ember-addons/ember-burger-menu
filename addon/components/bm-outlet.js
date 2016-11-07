import Ember from 'ember';
import layout from '../templates/components/bm-outlet';
import cssStringify from 'ember-burger-menu/utils/css-stringify';

const {
  computed,
  canInvoke
} = Ember;

export default Ember.Component.extend({
  classNames: ['bm-outlet'],
  attributeBindings: ['style'],
  layout,

  state: null,

  style: computed('state.{styles,open,width,isRight}', function() {
    let state = this.get('state');
    let { styles, open, width, isRight } = state.getProperties(['styles', 'open', 'width', 'isRight']);

    if (canInvoke(styles, 'outlet')) {
      return cssStringify(styles.outlet(open, width, isRight));
    }
  }).readOnly()
});
