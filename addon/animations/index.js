import Ember from 'ember';
import requireModule from 'ember-require-module';

const {
  assert,
  isEmpty
} = Ember;

const ANIMATION_PATH = 'ember-burger-menu/animations';

export default function getAnimation(animation, itemAnimation) {
  let AnimationClass = requireModule(`${ANIMATION_PATH}/${animation}`);

  assert(`The animation '${animation}' could not be found.`, AnimationClass);

  if (!isEmpty(itemAnimation)) {
    let MenuItemMixin = requireModule(`${ANIMATION_PATH}/menu-item/${itemAnimation}`);

    assert(`The item animation '${itemAnimation}' could not be found.`, MenuItemMixin);

    AnimationClass = AnimationClass.extend(MenuItemMixin);
  }

  return AnimationClass;
}
