import Animation from 'ember-burger-menu/animations/base';

export default Animation.extend({
  animation: 'slide-reverse',

  outlet(open, width, right) {
    return {
      transform: open
        ? right
          ? `translate3d(-${width}px, 0, 0)`
          : `translate3d(${width}px, 0, 0)`
        : '',
    };
  },
});
