import Animation from 'ember-burger-menu/animations/base';

export default Animation.extend({
  animation: 'scale-down',

  outlet(open, width) {
    return {
      transform: open ? `translate3d(0, 0, -${width}px)` : '',
    };
  },
});
