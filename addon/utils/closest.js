import matches from 'matches-selector';

export default function closest(el, selector, checkSelf) {
  let parent = checkSelf ? el : el.parentNode;

  while(parent && parent !== document) {
    if (matches(parent, selector)) {
      return parent;
    } else {
      parent = parent.parentNode;
    }
  }
}
