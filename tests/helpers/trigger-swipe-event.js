import $ from 'jquery';

export default function triggerSwipeEvent($el, direction, distance = 150) {
  let swipeRight = direction === 'right';
  let startPos = swipeRight ? 0 : distance;
  let endPos = swipeRight ? distance : 0;

  $el.trigger($.Event('touchstart', {
    isSimulated: true,
    originalEvent: {
      touches: [{
        pageX: startPos,
        pageY: 0,
        screenX: startPos,
        screenY: 0
      }]
    }
  }));

  $el.trigger($.Event('touchmove', {
    isSimulated: true,
    originalEvent: {
      touches: [{
        pageX: endPos,
        pageY: 0,
        screenX: endPos,
        screenY: 0
      }]
    }
  }));

  $el.trigger($.Event('touchend'));
}
