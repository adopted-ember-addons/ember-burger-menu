import Ember from 'ember';
import getAnimation from 'ember-burger-menu/animations';

const {
  computed
} = Ember;

const State = Ember.Object.extend({
  open: false,
  locked: false,
  width: 300,
  position: 'left',
  animation: 'slide',

  minSwipeDistance: 150,
  maxSwipeTime: 300,

  itemAnimation: null,
  customAnimation: null,

  styles: computed('animation', 'itemAnimation', 'customAnimation', function() {
    let animation = this.get('animation');
    let itemAnimation = this.get('itemAnimation');
    let customAnimation = this.get('customAnimation');

    return getAnimation(customAnimation || animation, itemAnimation).create();
  }).readOnly(),

  actions: computed(function() {
    return {
      open: () => this.set('open', true),
      close: () => this.set('open', false),
      toggle: () => this.toggleProperty('open')
    };
  }).readOnly()
});

/**
 * States is an object proxy that will create a new state
 * on `get` if the key doesnt exist already in the content.
 */
const States = Ember.ObjectProxy.extend({
  unknownProperty(key) {
    let content = this.get('content');

    if (!content[key]) {
      content[key] = State.create();
    }

    return content[key];
  }
});

export default Ember.Service.extend({
  states: computed(() => States.create({ content: {} })).readOnly()
});
