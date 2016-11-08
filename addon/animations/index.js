import requireModule from 'ember-require-module';

export default function getAnimationStylesFor(animation) {
  return requireModule(`ember-burger-menu/animations/${animation}`) || {};
}
