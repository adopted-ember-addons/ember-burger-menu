export const KEYS = {
  ESCAPE: 27
};

export default function triggerKeyboardEvent($el, type, key) {
  let press = $.Event(type);
  press.which = key;
  press.keyCode = key;
  $el.trigger(press);
}
