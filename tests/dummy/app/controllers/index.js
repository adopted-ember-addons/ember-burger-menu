import Controller from '@ember/controller';
import { action, set } from '@ember/object';

export default class IndexController extends Controller {
  queryParams = [
    'animation',
    'itemAnimation',
    'position',
    'locked',
    'translucentOverlay',
    'dismissOnClick',
    'dismissOnEsc',
    'gesturesEnabled',
  ];

  translucentOverlay = true;
  dismissOnClick = true;
  dismissOnEsc = true;
  gesturesEnabled = true;

  animation = 'slide';
  itemAnimation = null;
  position = 'left';
  locked = false;

  constructor() {
    super(...arguments);

    this.animations = [
      'slide',
      'reveal',
      'push',
      'fall-down',
      'open-door',
      'push-rotate',
      'rotate-out',
      'scale-up',
      'scale-down',
      'scale-rotate',
      'slide-reverse',
      'squeeze',
    ];

    this.itemAnimations = ['push', 'stack'];
  }

  @action
  setMenu(key, value) {
    set(this, key, value);
  }
}
