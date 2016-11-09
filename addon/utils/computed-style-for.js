import Ember from 'ember';

const {
  computed
} = Ember;

export default function computedStyleFor(type) {
  return computed('state.{styles,open,width,position}', function() {
    let state = this.get('state');
    let args = state.getProperties(['open', 'width', 'position']);

    if (type === 'menuItem') {
      args.index = this.get('index');
    }

    return state.get('styles').generateCSSFor(type,  args);
  });
}
