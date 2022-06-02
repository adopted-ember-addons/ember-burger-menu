import EmberObject, { action, computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import getAnimation from 'ember-burger-menu/animations';

export default class State extends EmberObject {
  open = false;
  locked = false;
  width = 300;
  position = 'left';
  animation = 'slide';

  minSwipeDistance = 150;
  maxSwipeTime = 300;

  itemAnimation = null;
  customAnimation = null;

  @computed('animation', 'itemAnimation', 'customAnimation')
  get styles() {
    let animation = this.animation;
    let itemAnimation = this.itemAnimation;
    let customAnimation = this.customAnimation;

    return getAnimation(customAnimation || animation, itemAnimation).create();
  }

  @action
  openMenu() {
    return !this.locked && this.set('open', true);
  }

  @action
  closeMenu() {
    return !this.locked && this.set('open', false);
  }

  @action
  toggleMenu() {
    return !this.locked && this.toggleProperty('open');
  }
}
