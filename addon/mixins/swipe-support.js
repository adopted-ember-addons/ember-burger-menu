import Mixin from '@ember/object/mixin';
import { isNone } from '@ember/utils';
import { alias } from '@ember/object/computed';

let meta;

export default Mixin.create({
  minSwipeDistance: alias('state.minSwipeDistance'),
  maxSwipeTime: alias('state.maxSwipeTime'),

  onSwipe(/* direction, target */) {},

  touchStart(event) {
    this._super(...arguments);

    const { pageX, pageY } = event.touches[0];

    meta = {
      target: event.target,
      start: {
        x: pageX,
        y: pageY,
        time: new Date().getTime(),
      },
    };
  },

  touchMove({ touches = [] }) {
    this._super(...arguments);

    const { pageX, pageY } = touches[0];

    meta.differences = {
      x: pageX - meta.start.x,
      y: pageY - meta.start.y,
    };

    // Compute swipe direction
    if (isNone(meta.isHorizontal)) {
      meta.isHorizontal =
        Math.abs(meta.differences.x) > Math.abs(meta.differences.y);
    }

    // A valid swipe event uses only one finger
    if (touches.length > 1) {
      meta.isInvalid = true;
    }
  },

  touchEnd() {
    this._super(...arguments);
    const { minSwipeDistance, maxSwipeTime } = this;
    const elapsedTime = new Date().getTime() - meta.start.time;

    if (
      meta.isHorizontal &&
      !meta.isInvalid &&
      Math.abs(meta.differences.x) >= minSwipeDistance &&
      elapsedTime <= maxSwipeTime
    ) {
      this.onSwipe(meta.differences.x > 0 ? 'right' : 'left', meta.target);
    }
  },
});
