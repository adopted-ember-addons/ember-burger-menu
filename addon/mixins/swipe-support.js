import Mixin from '@ember/object/mixin';
import { isNone } from '@ember/utils';
import { alias } from '@ember/object/computed';

let meta;

export default Mixin.create({
  minSwipeDistance: alias('state.minSwipeDistance'),
  maxSwipeTime: alias('state.maxSwipeTime'),

  onSwipe(/* direction, target */) {},

  touchStart(e) {
    this._super(...arguments);

    // jscs:disable
    let touch = e.touches[0];
    // jscs:enable

    meta = {
      target: e.target,
      start: {
        x: touch.pageX,
        y: touch.pageY,
        time: new Date().getTime(),
      },
    };
  },

  touchMove(e) {
    this._super(...arguments);

    // jscs:disable
    let touch = e.touches[0];
    // jscs:enable

    meta.differences = {
      x: touch.pageX - meta.start.x,
      y: touch.pageY - meta.start.y,
    };

    // Compute swipe direction
    if (isNone(meta.isHorizontal)) {
      meta.isHorizontal =
        Math.abs(meta.differences.x) > Math.abs(meta.differences.y);
    }

    // A valid swipe event uses only one finger
    if (e.touches.length > 1) {
      meta.isInvalid = true;
    }
  },

  touchEnd() {
    this._super(...arguments);

    let minSwipeDistance = this.minSwipeDistance;
    let maxSwipeTime = this.maxSwipeTime;
    let elapsedTime = new Date().getTime() - meta.start.time;

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
