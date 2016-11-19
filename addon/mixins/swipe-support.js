import Ember from 'ember';

const {
  $,
  on,
  isNone
} = Ember;

let meta;

export default Ember.Mixin.create({
  minSwipeDistance: 150,
  maxSwipeTime: 300,

  _setupSwipeEvents: on('didInsertElement', function() {
    let $element = this.$();

    $element.on('touchstart.bm-swipe', this._onSwipeStart.bind(this));
    $element.on('touchmove.bm-swipe', this._onSwipeMove.bind(this));
    $element.on('touchend.bm-swipe', this._onSwipeEnd.bind(this));
  }),

  _teardownSwipeEvents: on('willDestroyElement', function() {
    let $element = this.$();

    $element.off('touchstart.bm-swipe');
    $element.off('touchmove.bm-swipe');
    $element.off('touchend.bm-swipe');
  }),

  onSwipe(/* direction, isMenuSwipe */) {},

  _onSwipeStart(e) {
    // jscs:disable
    let touch = e.touches[0];
    // jscs:enable
    meta = {
      isMenuSwipe: $(e.target).closest('.bm-menu').length > 0
    };

    meta.start = {
      x: touch.pageX,
      y: touch.pageY,
      time: new Date().getTime()
    };
  },

  _onSwipeMove(e) {
    // jscs:disable
    let touch = e.touches[0];
    // jscs:enable

    meta.differences = {
      x: touch.pageX - meta.start.x,
      y: touch.pageY - meta.start.y
    };

    // Compute swipe direction
    if (isNone(meta.isHorizontal)) {
      meta.isHorizontal = (Math.abs(meta.differences.x) > Math.abs(meta.differences.y));
    }

    // A valid swipe event uses only one finger
    if (e.touches.length > 1) {
      meta.isInvalid = true;
    }

    if (meta.isHorizontal && !meta.isInvalid) {
      e.preventDefault();
    }
  },

  _onSwipeEnd() {
    let minSwipeDistance = this.get('minSwipeDistance');
    let maxSwipeTime = this.get('maxSwipeTime');
    let elapsedTime =  new Date().getTime() - meta.start.time;

    if (meta.isHorizontal && !meta.isInvalid &&
        Math.abs(meta.differences.x) >= minSwipeDistance &&
        elapsedTime <= maxSwipeTime) {
      this.onSwipe((meta.differences.x > 0) ? 'right' : 'left', meta.isMenuSwipe);
    }
  }
});
