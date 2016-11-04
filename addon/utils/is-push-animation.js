export const PUSH_ANIMATIONS = [
  'push',
  'rotate-out'
];

export default function isPushAnimation(a) {
  return PUSH_ANIMATIONS.indexOf(a) > -1;
}
