import Ember from 'ember';
import getAnimation from 'ember-burger-menu/animations';

const {
  computed
} = Ember;

export default Ember.Service.extend({
  open: false,
  width: 300,
  position: 'left',
  animation: 'slide',
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
