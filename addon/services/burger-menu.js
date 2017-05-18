import Ember from 'ember';
import State from 'ember-burger-menu/-private/state';

const {
  computed
} = Ember;

/**
 * States is an object proxy that will create a new state
 * on `get` if the key doesnt exist already in the content.
 */
const States = Ember.ObjectProxy.extend({
  unknownProperty(key) {
    let content = this.get('content');

    if (!content[key]) {
      content[key] = State.create({ _id: key });
    }

    return content[key];
  }
});

export default Ember.Service.extend({
  states: computed(() => States.create({ content: {} })).readOnly()
});
