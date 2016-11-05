import Ember from 'ember';
import layout from '../templates/components/ember-burger';
import menuFor from 'ember-burger-menu';
import cssStringify from 'ember-burger-menu/utils/css-stringify';

const {
  $,
  on,
  run,
  observer,
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['ember-burger-menu'],
  classNameBindings: ['menuId', 'open:is-open', 'translucentOverlay', 'animation', 'position'],
  attributeBindings: ['style'],

  open: computed.alias('state.open'),
  animation: computed.alias('state.animation'),
  position: computed.alias('state.position'),
  width: computed.alias('state.width'),
  styleFn: computed.alias('state.styleFn'),
  translucentOverlay: true,
  dismissOnClick: true,
  dismissOnEsc: true,
  menuId: 'main',

  state: computed(function() {
    return menuFor(this.get('menuId'));
  }).readOnly(),

  style: computed('open', 'state.styles', function() {
    let openState = this.get('open') ? 'open' : 'closed';
    let styles = this.get('state.styles');

    return cssStringify(styles[openState].container);
  }).readOnly(),

  setupEvents: on('didInsertElement', observer('open', function() {
    let method = this.get('open') ? '_setupEvents' : '_teardownEvents';
    this._setupEventsTimer = run.scheduleOnce('afterRender', this, method);
  })),

  destroy() {
    this._super(...arguments);
    run.cancel(this._setupEventsTimer);
    this._teardownEvents();
  },

  _setupEvents() {
    let postfix = `burget-menu-${this.get('elementId')}`;
    let onClick = this.send.bind(this, 'onClick');
    let onKeyUp =  this.send.bind(this, 'onKeyUp');
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
    let postfix = `burget-menu-${this.get('elementId')}`;
    let $body = $('body');

    $body.off(`click.${postfix}`);
    $body.off(`touchstart.${postfix}`);
    $body.off(`keyup.${postfix}`);
  },

  actions: {
    onClick(e) {
      if ($(e.target).closest('.bm-menu').length === 0) {
        e.stopPropagation();
        e.preventDefault();

        this.set('open', false);
        this._teardownEvents();
      }
    },

    onKeyUp(e) {
      if (e.keyCode === 27) {
        this.set('open', false);
        this._teardownEvents();
      }
    }
  }
});
