import { assert } from '@ember/debug';
import { isEmpty, typeOf } from '@ember/utils';
import requireModule from 'ember-require-module';

const ANIMATION_PATH = 'ember-burger-menu/animations';
const ANIMATION_ITEM_PATH = `${ANIMATION_PATH}/menu-item`;

export default function getAnimation(animation, itemAnimation) {
  let AnimationClass;

  if (typeOf(animation) === 'class' && animation.__isAnimation__) {
    AnimationClass = animation;
  } else {
    AnimationClass = requireModule(`${ANIMATION_PATH}/${animation}`);
    assert(`The animation '${animation}' could not be found.`, AnimationClass);
  }

  if (!isEmpty(itemAnimation)) {
    let MenuItemMixin = requireModule(`${ANIMATION_ITEM_PATH}/${itemAnimation}`);

    assert(`The item animation '${itemAnimation}' could not be found.`, MenuItemMixin);

    return AnimationClass.extend(MenuItemMixin);
  }

  return AnimationClass;
}
