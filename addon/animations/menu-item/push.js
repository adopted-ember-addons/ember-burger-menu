import Ember from 'ember';

export default Ember.Mixin.create({
  itemAnimation: 'push',

  menuItem(open, width, right, index) {
    return {
      transform: open ? '' : right ?  `translate3d(${(index + 1) * 500}px, 0, 0)` :  `translate3d(-${(index + 1) * 500}px, 0, 0)`
    };
  }
});
