import Component from '@ember/component';
import { on } from '@ember/object/evented';
import { run } from '@ember/runloop';
import { computed, observer } from '@ember/object';
import { alias } from '@ember/object/computed';
import layout from '../templates/components/burger-menu';
import computedStyleFor from 'ember-burger-menu/computed/style-for';
import SwipeSupportMixin from 'ember-burger-menu/mixins/swipe-support';
import State from 'ember-burger-menu/-private/state';
import DomMixin from 'ember-lifeline/mixins/dom';
import isFastboot from 'ember-burger-menu/utils/is-fastboot';
import closest from 'ember-burger-menu/utils/closest';
import { normalizeEvent } from 'ember-jquery-legacy';

export default Component.extend(DomMixin, SwipeSupportMixin, {
  layout,
  classNames: ['ember-burger-menu'],
  classNameBindings: [
    'open:is-open',
    'translucentOverlay',
    'animationClass',
    'itemAnimationClass',
    'position'
  ],
  attributeBindings: ['style'],

  translucentOverlay: true,
  dismissOnClick: true,
  dismissOnEsc: true,
  gesturesEnabled: true,

  state: computed(() => State.create()).readOnly(),

  open: alias('state.open'),
  locked: alias('state.locked'),
  position: alias('state.position'),
  width: alias('state.width'),
  animation: alias('state.animation'),
  itemAnimation: alias('state.itemAnimation'),
  customAnimation: alias('state.customAnimation'),

  style: computedStyleFor('container').readOnly(),

  animationClass: computed('state.styles.animation', function() {
    let animation = this.get('state.styles.animation');
    return animation ? `bm--${animation}` : '';
  }).readOnly(),

  itemAnimationClass: computed('state.styles.itemAnimation', function() {
    let itemAnimation = this.get('state.styles.itemAnimation');
    return itemAnimation ? `bm-item--${itemAnimation}` : '';
  }).readOnly(),

  willDestroyElement() {
    this._super(...arguments);
    run.cancel(this._setupEventsTimer);
  },

  setupEvents: on(
    'didReceiveAttrs',
    observer('open', 'locked', function() {
      if (isFastboot()) {
        return;
      }

      run.later(() => {
        let methodName =
          this.get('open') && !this.get('locked')
            ? '_setupEvents'
            : '_teardownEvents';
        this._setupEventsTimer = run.scheduleOnce(
          'afterRender',
          this,
          methodName
        );
      }, 0);
    })
  ),

  _setupEvents() {
    if (this.get('dismissOnClick')) {
      this.addEventListener(document.body, `click`, this.onClick);
      this.addEventListener(document.body, `touchstart`, this.onClick);
    }

    if (this.get('dismissOnEsc')) {
      this.addEventListener(window, `keyup`, this.onKeyup);
    }
  },

  _teardownEvents() {
    this.removeEventListener(document.body, `click`, this.onClick);
    this.removeEventListener(document.body, `touchstart`, this.onClick);
    this.removeEventListener(window, `keyup`, this.onKeyup);
  },

  onClick(e) {
    let nativeEvent = normalizeEvent(e);
    let elementId = this.get('elementId');
    // Close the menu if clicked outside of it
    if (!closest(nativeEvent.target, `#${elementId} .bm-menu`, true)) {
      this.get('state.actions').close();
    }
  },

  onKeyup(e) {
    let nativeEvent = normalizeEvent(e);
    if (nativeEvent.keyCode === 27) {
      this.get('state.actions').close();
    }
  },

  onSwipe(direction, target) {
    let position = this.get('position');
    let open = this.get('open');
    let gesturesEnabled = this.get('gesturesEnabled');
    let isMenuSwipe = closest(target, '.bm-menu', true);

    if (!gesturesEnabled) {
      return;
    }

    if (open && isMenuSwipe && position === direction) {
      this.get('state.actions').close();
    } else if (!open && position !== direction) {
      this.get('state.actions').open();
    }
  }
});
