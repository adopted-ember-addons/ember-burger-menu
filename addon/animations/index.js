import requireModule from 'ember-require-module';

const Styles = {};

export default function getAnimationStylesFor(animation) {
  if (!Styles[animation]) {
    Styles[animation] = requireModule(`ember-burger-menu/animations/${animation}`) || {};
  }

  return Styles[animation];
}
