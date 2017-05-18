import Ember from 'ember';
import layout from '../templates/components/burger-menu';
import computedStyleFor from 'ember-burger-menu/computed/style-for';
import SwipeSupportMixin from 'ember-burger-menu/mixins/swipe-support';
import DomMixin from 'ember-lifeline/mixins/dom';

const {
  $,
  on,
  run,
  guidFor,
  observer,
  computed,
  computed: { alias },
  inject: { service }
} = Ember;

export default Ember.Component.extend(DomMixin, SwipeSupportMixin, {
  layout,
  classNames: ['ember-burger-menu'],
  classNameBindings: ['open:is-open', 'translucentOverlay', 'animationClass', 'menuIdClass', 'position'],
  attributeBindings: ['style'],

  burgerMenu: service('burgerMenu'),

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

  menuId: computed(function() {
    return guidFor(this);
  }),

  /**
   * Create an initial state object. All modified attributes
   * will be stored in `content` and will be applied to the real
   * state object after init.
   */
  state: computed(() => Ember.ObjectProxy.create({ content: {} })),

  animationClass: computed('state.styles.animation', function() {
    return `bm--${this.get('state.styles.animation')}`;
  }).readOnly(),

  menuIdClass: computed('menuId', function() {
    return `bm-id--${this.get('menuId')}`;
  }).readOnly(),

  init() {
    this._super(...arguments);

    let state = this.get(`burgerMenu.states.${this.get('menuId')}`);

    state.setProperties(this.get('state.content'));
    this.set('state', state);
  },

  willDestroyElement() {
    this._super(...arguments);
    run.cancel(this._setupEventsTimer);
  },

  setupEvents: on('didReceiveAttrs', observer('open', 'locked', function() {
    let methodName = (this.get('open') && !this.get('locked')) ? '_setupEvents' : '_teardownEvents';
    this._setupEventsTimer = run.scheduleOnce('afterRender', this, methodName);
  })),

  _setupEvents() {
    let elementId = this.get('elementId');

    if (this.get('dismissOnClick')) {
      this.addEventListener($('body'), `click.${elementId}`, this.onClick);
      this.addEventListener($('body'), `touchstart.${elementId}`, this.onClick);
    }

    if (this.get('dismissOnEsc')) {
      this.addEventListener(document, `keyup.${elementId}`, this.onKeyup);
    }
  },

  _teardownEvents() {
    let elementId = this.get('elementId');

    this.removeEventListener($('body'), `click.${elementId}`, this.onClick);
    this.removeEventListener($('body'), `touchstart.${elementId}`, this.onClick);
    this.removeEventListener(document, `keyup.${elementId}`, this.onKeyup);
  },

  onClick(e) {
    let elementId = this.get('elementId');

    // Close the menu if clicked outside of it
    if ($(e.target).closest(`#${elementId} .bm-menu`).length === 0) {
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
