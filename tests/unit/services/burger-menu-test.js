import { moduleFor, test } from 'ember-qunit';

moduleFor('service:burger-menu', 'Unit | Service | burger menu', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('states', function(assert) {
  let service = this.subject();
  let fooState = service.get('states.foo');

  assert.ok(fooState);
  assert.equal(fooState.get('animation'), 'slide');
  assert.equal(service.get('states.foo'), fooState, 'Make sure we are not recreating state');
});
