import Controller from '@ember/controller';

export default class MultipleController extends Controller {
  menus = [
    {
      open: false,
      color: 'green',
      position: 'left',
      animation: 'slide',
    },
    {
      open: false,
      color: 'yellow',
      position: 'right',
      animation: 'slide',
    },
    {
      open: false,
      color: 'blue',
      position: 'left',
      animation: 'slide',
    },
    {
      open: false,
      color: 'red',
      position: 'right',
      animation: 'slide',
    },
  ];
}
