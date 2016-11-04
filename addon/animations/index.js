import requireModule from 'ember-require-module';

const Effects = {};
const defaultFn = () => {};

export default function getEffectStylesFor(e, ...args) {
  let fn = Effects[e];

  if (!fn) {
    fn = requireModule(`ember-burger-menu/effects/${e}`) || defaultFn;
    Effects[e] = fn;
  }

  return fn(...args) || {};
}
