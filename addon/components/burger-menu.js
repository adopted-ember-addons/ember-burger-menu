import Component from '@ember/component';
import { on } from '@ember/object/evented';
import { cancel, scheduleOnce } from '@ember/runloop';
import { computed, observer } from '@ember/object';
import { alias } from '@ember/object/computed';
import layout from '../templates/components/burger-menu';
import computedStyleFor from 'ember-burger-menu/computed/style-for';
import SwipeSupportMixin from 'ember-burger-menu/mixins/swipe-support';
import State from 'ember-burger-menu/-private/state';
import isFastboot from 'ember-burger-menu/utils/is-fastboot';
import {
  addEventListener,
  removeEventListener,
  runDisposables,
} from 'ember-lifeline';

export default Component.extend(SwipeSupportMixin, {
  layout,
  classNames: ['ember-burger-menu'],
  classNameBindings: [
    'open:is-open',
    'translucentOverlay',
    'animationClass',
    'itemAnimationClass',
    'position',
  ],
  attributeBindings: ['style'],

  translucentOverlay: true,
  dismissOnClick: true,
  dismissOnEsc: true,
  gesturesEnabled: true,

  state: computed(function () {
    return State.create();
  }).readOnly(),

  open: alias('state.open'),
  locked: alias('state.locked'),
  position: alias('state.position'),
  width: alias('state.width'),
  animation: alias('state.animation'),
  itemAnimation: alias('state.itemAnimation'),
  customAnimation: alias('state.customAnimation'),

  style: computedStyleFor('container').readOnly(),

  animationClass: computed('state.styles.animation', function () {
    let animation = this.get('state.styles.animation');
    return animation ? `bm--${animation}` : '';
  }).readOnly(),

  itemAnimationClass: computed('state.styles.itemAnimation', function () {
    let itemAnimation = this.get('state.styles.itemAnimation');
    return itemAnimation ? `bm-item--${itemAnimation}` : '';
  }).readOnly(),

  willDestroyElement() {
    this._super(...arguments);
    cancel(this._setupEventsTimer);
    runDisposables(this);
  },

  setupEvents: on(
    'didReceiveAttrs',
    observer('open', 'locked', function () {
      if (isFastboot()) {
        return;
      }

      let methodName =
        this.open && !this.locked ? '_setupEvents' : '_teardownEvents';
      this._setupEventsTimer = scheduleOnce('afterRender', this, methodName);
    })
  ),

  _setupEvents() {
    if (this.dismissOnClick) {
      addEventListener(this, document.body, 'click', this.onClick);
      addEventListener(this, document.body, 'touchstart', this.onClick);
    }

    if (this.dismissOnEsc) {
      addEventListener(this, window, 'keyup', this.onKeyup);
    }
  },

  _teardownEvents() {
    removeEventListener(this, document.body, 'click', this.onClick);
    removeEventListener(this, document.body, 'touchstart', this.onClick);
    removeEventListener(this, window, 'keyup', this.onKeyup);
  },

  onClick(e) {
    let elementId = this.elementId;
    // Close the menu if clicked outside of it
    if (e.target.closest(`#${elementId} .bm-menu`)) {
      this.get('state.actions').close();
    }
  },

  onKeyup(e) {
    if (e.keyCode === 27) {
      this.get('state.actions').close();
    }
  },

  onSwipe(direction, target) {
    let position = this.position;
    let open = this.open;
    let gesturesEnabled = this.gesturesEnabled;
    let isMenuSwipe = target.closest('.bm-menu');

    if (!gesturesEnabled) {
      return;
    }

    if (open && isMenuSwipe && position === direction) {
      this.get('state.actions').close();
    } else if (!open && position !== direction) {
      this.get('state.actions').open();
    }
  },
});
