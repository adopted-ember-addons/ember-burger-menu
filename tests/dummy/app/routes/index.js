import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    animation: { replace: true },
    itemAnimation: { replace: true },
    position: { replace: true },
    translucentOverlay: { replace: true },
    dismissOnClick: { replace: true },
    dismissOnEsc: { replace: true }
  }
});
