import { computed } from '@ember/object';

export default function computedStyleFor(type) {
  return computed('state.{styles,open,width,position}', 'index', function() {
    let state = this.get('state');
    let args = state.getProperties(['open', 'width', 'position']);

    if (type === 'menuItem') {
      args.index = this.get('index');
    }

    return state.get('styles').generateCSSFor(type,  args);
  });
}
