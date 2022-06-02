import Mixin from '@ember/object/mixin';

export default Mixin.create({
  itemAnimation: 'stack',

  menuItem(open, width, right, index) {
    return {
      transform: open ? '' : `translate3d(0, ${(index + 1) * 500}px, 0)`,
    };
  },
});
