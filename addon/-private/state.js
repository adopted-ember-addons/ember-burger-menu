/* eslint-disable ember/no-computed-properties-in-native-classes */
import EmberObject, { action, computed } from '@ember/object';
import getAnimation from 'ember-burger-menu/animations';
import { tracked } from '@glimmer/tracking';

export default class State extends EmberObject {
  @tracked open = false;
  @tracked locked = false;
  @tracked width = 300;
  @tracked position = 'left';
  @tracked animation = 'slide';

  @tracked minSwipeDistance = 150;
  @tracked maxSwipeTime = 300;

  @tracked itemAnimation = null;
  @tracked customAnimation = null;

  @computed('animation', 'itemAnimation', 'customAnimation')
  get styles() {
    const { animation, itemAnimation, customAnimation } = this;

    return getAnimation(customAnimation || animation, itemAnimation).create();
  }

  @action
  openMenu(event) {
    event?.stopPropagation?.();
    if (!this.locked) {
      this.open = true;
    }
  }

  @action
  closeMenu(event) {
    event?.stopPropagation?.();
    if (!this.locked) {
      this.open = false;
    }
  }

  @action
  toggleMenu(event) {
    event?.stopPropagation?.();
    if (!this.locked) {
      this.open = !this.open;
    }
  }
}
