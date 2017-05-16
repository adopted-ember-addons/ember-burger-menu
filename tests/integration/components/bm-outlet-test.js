import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  getOwner
} = Ember;

const template = hbs`
  {{#bm-outlet state=state}}
    Content
  {{/bm-outlet}}
`;

moduleForComponent('bm-outlet', 'Integration | Component | bm outlet', {
  integration: true,

  beforeEach() {
    this.setProperties({
      state: getOwner(this).lookup('service:burger-menu').get('states.default')
    });
  }
});

test('it renders', function(assert) {
  this.render(template);
  assert.equal(this.$().text().trim(), 'Content');
});
