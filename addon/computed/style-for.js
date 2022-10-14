import { computed } from '@ember/object';

export default function computedStyleFor(type) {
  return computed('state.{styles,open,width,position}', 'index', function () {
    const { state, index } = this;
    const args = state.getProperties(['open', 'width', 'position']);

    if (type === 'menuItem') {
      args.index = index;
    }

    return state.get('styles').generateCSSFor(type, args);
  });
}
