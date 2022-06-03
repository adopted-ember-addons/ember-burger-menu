import { assert } from '@ember/debug';
import { isEmpty, typeOf } from '@ember/utils';
import { camelize } from '@ember/string';
import * as animations from './animations';
import * as itemAnimations from './item-animations';

export default function getAnimation(animation, itemAnimation) {
  let AnimationClass;

  if (typeOf(animation) === 'class' && animation.__isAnimation__) {
    AnimationClass = animation;
  } else {
    AnimationClass = animations[camelize(animation)];
    assert(`The animation '${animation}' could not be found.`, AnimationClass);
  }

  if (!isEmpty(itemAnimation)) {
    let MenuItemMixin = itemAnimations[camelize(itemAnimation)];

    assert(
      `The item animation '${itemAnimation}' could not be found.`,
      MenuItemMixin
    );

    return AnimationClass.extend(MenuItemMixin);
  }

  return AnimationClass;
}
