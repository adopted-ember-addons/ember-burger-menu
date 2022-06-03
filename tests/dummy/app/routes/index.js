import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    animation: { replace: true },
    itemAnimation: { replace: true },
    position: { replace: true },
    translucentOverlay: { replace: true },
    dismissOnClick: { replace: true },
    dismissOnEsc: { replace: true },
  },
});
