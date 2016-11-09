import Ember from 'ember';
import layout from '../templates/components/ember-burger';
import burgerMenu from 'ember-burger-menu';
import computedStyleFor from 'ember-burger-menu/utils/computed-style-for';

const {
  $,
  on,
  run,
  observer,
  computed
} = Ember;

export default Ember.Component.extend({
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
  customStyles: computed.alias('state.customStyles'),

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
    let method = this.get('open') ? '_setupEvents' : '_teardownEvents';
    this._setupEventsTimer = run.scheduleOnce('afterRender', this, method);
  })),

  _setupEvents() {
    let postfix = `burger-menu-${this.get('elementId')}`;
    let onClick = this.onClick.bind(this);
    let onKeyUp = this.onKeyup.bind(this);
    let $body = $('body');

    if (this.get('dismissOnClick')) {
      $body.on(`click.${postfix}`, onClick);
      $body.on(`touchstart.${postfix}`, onClick);
    }

    if (this.get('dismissOnEsc')) {
      $body.on(`keyup.${postfix}`, onKeyUp);
    }
  },

  _teardownEvents() {
    let postfix = `burger-menu-${this.get('elementId')}`;
    let $body = $('body');

    $body.off(`click.${postfix}`);
    $body.off(`touchstart.${postfix}`);
    $body.off(`keyup.${postfix}`);
  },

  onClick(e) {
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
  }
});
