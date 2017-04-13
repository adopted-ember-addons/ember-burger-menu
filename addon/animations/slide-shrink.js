import Animation from 'ember-burger-menu/animations/base';

export default Animation.extend({
  animation: 'slide-shrink',

  outlet(open, width, right) {
    return {
      marginLeft: (open && !right) ? `${width}px` : 0,
      marginRight: (open && right) ? `${width}px` : 0
    };
  }
});
