import Ember from 'ember';
import requireModule from 'ember-require-module';

const {
  assign
} = Ember;

const defaultResult = { container: {}, outlet: {}, menu: {} };
const defaultFn = () => defaultResult;
const Effects = {};

export default function getEffectStylesFor(e, ...args) {
  let fn = Effects[e];

  if (!fn) {
    fn = requireModule(`ember-burger-menu/animations/${e}`) || defaultFn;
    Effects[e] = fn;
  }

  return assign({}, defaultResult, fn(...args) || {});
}
