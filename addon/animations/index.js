import Ember from 'ember';
import requireModule from 'ember-require-module';

const {
  assert,
  typeOf,
  isEmpty
} = Ember;

const ANIMATION_PATH = 'ember-burger-menu/animations';

export default function getAnimation(animation, itemAnimation) {
  let AnimationClass;

  if (typeOf(animation) === 'class' && animation.__isAnimation__) {
    AnimationClass = animation;
  } else {
    AnimationClass = requireModule(`${ANIMATION_PATH}/${animation}`);
    assert(`The animation '${animation}' could not be found.`, AnimationClass);
  }

  if (!isEmpty(itemAnimation)) {
    let MenuItemMixin = requireModule(`${ANIMATION_PATH}/menu-item/${itemAnimation}`);

    assert(`The item animation '${itemAnimation}' could not be found.`, MenuItemMixin);

    return AnimationClass.extend(MenuItemMixin);
  }

  return AnimationClass;
}
