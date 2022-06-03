import Animation from 'ember-burger-menu/animations/base';

export default Animation.extend({
  animation: 'scale-rotate',

  outlet(open, width, right) {
    return {
      transform: open
        ? right
          ? `translate3d(-100px, 0, -${width * 2}px) rotateY(20deg)`
          : `translate3d(100px, 0, -${width * 2}px) rotateY(-20deg)`
        : '',
    };
  },
});
