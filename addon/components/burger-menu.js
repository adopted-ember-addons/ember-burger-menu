import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import layout from '../templates/components/burger-menu';
import computedStyleFor from 'ember-burger-menu/computed/style-for';
import SwipeSupportMixin from 'ember-burger-menu/mixins/swipe-support';
import State from 'ember-burger-menu/-private/state';
import isFastboot from 'ember-burger-menu/utils/is-fastboot';

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

  init() {
    this._super(...arguments);

    this.onClick = (e) => {
      if (this.dismissOnClick) {
        let elementId = this.elementId;
        // Close the menu if clicked outside of it
        if (!e.target.closest(`#${elementId} .bm-menu`)) {
          this.get('state').closeMenu();
        }
      }
    };

    this.onKeyup = (e) => {
      if (this.dismissOnEsc) {
        if (e.keyCode === 27) {
          this.get('state').closeMenu();
        }
      }
    };

    this._setupEvents();
  },

  willDestroyElement() {
    this._teardownEvents();
    this._super(...arguments);
  },

  _setupEvents() {
    if (isFastboot()) {
      return;
    }

    document.body.addEventListener('click', this.onClick);
    document.body.addEventListener('touchstart', this.onClick);

    window.addEventListener('keyup', this.onKeyup);
  },

  _teardownEvents() {
    if (isFastboot()) {
      return;
    }

    document.body.removeEventListener('click', this.onClick);
    document.body.removeEventListener('touchstart', this.onClick);
    window.removeEventListener(this, window, 'keyup', this.onKeyup);
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
      this.get('state').closeMenu();
    } else if (!open && position !== direction) {
      this.get('state').openMenu();
    }
  },
});
