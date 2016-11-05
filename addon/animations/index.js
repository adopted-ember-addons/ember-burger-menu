import Ember from 'ember';
import requireModule from 'ember-require-module';
import MenuState from 'ember-burger-menu/-private/menu-state';

const {
  assert,
  assign
} = Ember;

const defaultResult = { container: {}, outlet: {}, menu: {} };
const defaultFn = () => defaultResult;
const Animations = {};

export default function getAnimationStylesFor(state, overrides = {}) {
  assert('The passed state must be an instance of MenuState', state instanceof MenuState);

  let stateProps = state.getProperties(['animation', 'isOpen', 'width', 'position', 'styleFn']);

  assign(stateProps, overrides);

  let { animation, isOpen, width, position, styleFn } = stateProps;
  let fn = Animations[animation];

  if (styleFn && typeof styleFn === 'function') {
    fn = styleFn;
  }

  if (!fn) {
    fn = requireModule(`ember-burger-menu/animations/${animation}`) || defaultFn;
    Animations[animation] = fn;
  }

  return assign({}, defaultResult, fn(isOpen, width, position === 'right') || {});
}
