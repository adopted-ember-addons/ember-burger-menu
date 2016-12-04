import Ember from 'ember';
import layout from '../templates/components/burger-menu';
import burgerMenu from 'ember-burger-menu';
import computedStyleFor from 'ember-burger-menu/utils/computed-style-for';
import SwipeSupport from 'ember-burger-menu/mixins/swipe-support';

const {
  $,
  on,
  run,
  observer,
  computed
} = Ember;

export default Ember.Component.extend(SwipeSupport, {
  classNames: ['ember-burger-menu'],
  classNameBindings: ['open:is-open', 'translucentOverlay', 'animationClass', 'position'],
  attributeBindings: ['style'],
  layout,

  state: burgerMenu,

  translucentOverlay: true,
  dismissOnClick: true,
  dismissOnEsc: true,

  open: computed.alias('state.open'),
  position: computed.alias('state.position'),
  width: computed.alias('state.width'),
  animation: computed.alias('state.animation'),
  itemAnimation: computed.alias('state.itemAnimation'),
  customAnimation: computed.alias('state.customAnimation'),

  style: computedStyleFor('container').readOnly(),

  animationClass: computed('state.styles.animation', function() {
    return `bm--${this.get('state.styles.animation')}`;
  }).readOnly(),

  willDestroyElement() {
    this._super(...arguments);
    run.cancel(this._setupEventsTimer);
    this._teardownEvents();
  },

  setupEvents: on('didInsertElement', observer('open', function() {
    let methodName = this.get('open') ? '_setupEvents' : '_teardownEvents';
    this._setupEventsTimer = run.scheduleOnce('afterRender', this, methodName);
  })),

  _setupEvents() {
    let $element = this.$();
    let onClick = this.onClick.bind(this);
    let onKeyUp = this.onKeyup.bind(this);

    if (this.get('dismissOnClick')) {
      $element.on('click.bm', onClick);
      $element.on('touchstart.bm', onClick);
    }

    if (this.get('dismissOnEsc')) {
      $(document).on('keyup.bm', onKeyUp);
    }
  },

  _teardownEvents() {
    let $element = this.$();

    $element.off('click.bm');
    $element.off('touchstart.bm');
    $(document).off('keyup.bm');
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
    let isMenuSwipe = target.closest('.bm-menu').length > 0;

    if (open && isMenuSwipe && position === direction) {
      this.set('open', false);
    } else if (!open && position !== direction) {
      this.set('open', true);
    }
  }
});
