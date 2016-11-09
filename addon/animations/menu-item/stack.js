import Ember from 'ember';

export default Ember.Mixin.create({
  itemAnimation: 'stack',

  menuItem(open, width, right, index) {
    return {
      transform: open ? '' : `translate3d(0, ${(index + 1) * 500}px, 0)`
    };
  }
});
