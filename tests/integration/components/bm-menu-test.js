import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import State from 'ember-burger-menu/-private/state';

const template = hbs`
  {{#bm-menu
    itemTagName=itemTagName
    state=state
    as |menu|
  }}
    {{#menu.item}}One{{/menu.item}}
    {{#menu.item}}Two{{/menu.item}}
  {{/bm-menu}}
`;

moduleForComponent('bm-menu', 'Integration | Component | bm menu', {
  integration: true,

  beforeEach() {
    this.setProperties({
      state: State.create(),
      itemTagName: 'li'
    });
  }
});

test('it renders', function(assert) {
  this.render(template);
  assert.ok(this.$('.bm-menu li:contains(One)').length, 'Menu item One exists');
  assert.ok(this.$('.bm-menu li:contains(Two)').length, 'Menu item Two exists');
});

test('menu actions trigger', function(assert) {
  let onOpen = false;
  let onClose = false;

  this.on('onOpen', () => onOpen = true);
  this.on('onClose', () => onClose = true);

  this.render(hbs`
    {{#bm-menu
      onOpen=(action 'onOpen')
      onClose=(action 'onClose')
      state=state
      as |burger|
    }}
    {{/bm-menu}}
  `);

  let state = this.get('state');

  run(() => state.set('open', true));
  assert.ok(onOpen, 'onOpen action was triggered');

  run(() => state.set('open', false));
  assert.ok(onClose, 'onClose action was triggered');
});
