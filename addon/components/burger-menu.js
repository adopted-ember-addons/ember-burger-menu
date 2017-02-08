import Ember from 'ember';
import layout from '../templates/components/burger-menu';
import computedStyleFor from 'ember-burger-menu/computed/style-for';
import SwipeSupportMixin from 'ember-burger-menu/mixins/swipe-support';
import DomMixin from 'ember-lifeline/mixins/dom';

const {
  $,
  on,
  run,
  observer,
  computed,
  computed: { alias },
  inject: { service }
} = Ember;

export default Ember.Component.extend(DomMixin, SwipeSupportMixin, {
  classNames: ['ember-burger-menu'],
  classNameBindings: ['open:is-open', 'translucentOverlay', 'animationClass', 'position'],
  attributeBindings: ['style'],
  layout,

  state: service('burgerMenu'),

  translucentOverlay: true,
  dismissOnClick: true,
  dismissOnEsc: true,
  gesturesEnabled: true,

  open: alias('state.open'),
  locked: alias('state.locked'),
  position: alias('state.position'),
  width: alias('state.width'),
  animation: alias('state.animation'),
  itemAnimation: alias('state.itemAnimation'),
  customAnimation: alias('state.customAnimation'),

  style: computedStyleFor('container').readOnly(),

  animationClass: computed('state.styles.animation', function() {
    return `bm--${this.get('state.styles.animation')}`;
  }).readOnly(),

  willDestroyElement() {
    this._super(...arguments);
    run.cancel(this._setupEventsTimer);
  },

  setupEvents: on('didInsertElement', observer('open', 'locked', function() {
    if (this.get('locked')) {
      this._setupEventsTimer = run.scheduleOnce('afterRender', this, '_teardownEvents');
    } else {
      let methodName = this.get('open') ? '_setupEvents' : '_teardownEvents';
      this._setupEventsTimer = run.scheduleOnce('afterRender', this, methodName);
    }
  })),

  _setupEvents() {
    if (this.get('dismissOnClick')) {
      this.addEventListener(this.$(), 'click', this.onClick);
      this.addEventListener(this.$(), 'touchstart', this.onClick);
    }

    if (this.get('dismissOnEsc')) {
      this.addEventListener(document, 'keyup', this.onKeyup);
    }
  },

  _teardownEvents() {
    this.removeEventListener(this.$(), 'click', this.onClick);
    this.removeEventListener(this.$(), 'touchstart', this.onClick);
    this.removeEventListener(document, 'keyup', this.onKeyup);
  },

  onClick(e) {
    // Close the menu if clicked outside of it
    if ($(e.target).closest('.bm-menu').length === 0) {
      e.stopPropagation();
      e.preventDefault();

      this.set('open', false);
    }
  },

  onKeyup(e) {
    if (e.keyCode === 27) {
      this.set('open', false);
    }
  },

  onSwipe(direction, target) {
    let position = this.get('position');
    let open = this.get('open');
    let locked = this.get('locked');
    let gesturesEnabled = this.get('gesturesEnabled');
    let isMenuSwipe = $(target).closest('.bm-menu').length > 0;

    if (!gesturesEnabled || locked) {
      return;
    }

    if (open && isMenuSwipe && position === direction) {
      this.set('open', false);
    } else if (!open && position !== direction) {
      this.set('open', true);
    }
  }
});
