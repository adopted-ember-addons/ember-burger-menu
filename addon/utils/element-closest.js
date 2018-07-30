export default function closest(targetElement, selector) {
  if (targetElement.closest) {
    return targetElement.closest(selector);
  }

  let matchesFn = targetElement.matches;
  if (!matchesFn) {
    matchesFn =
      targetElement.msMatchesSelector || targetElement.webkitMatchesSelector;
  }

  if (!document.documentElement.contains(targetElement)) {
    return null;
  }

  let el = targetElement;

  do {
    if (matchesFn(selector)) {
      return el;
    }
    el = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);

  return null;
}
