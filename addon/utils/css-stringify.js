import Ember from 'ember';

const {
  isEmpty,
  String: { htmlSafe }
} = Ember;

const PREFIXES = ['webkit'];
const TRANSFORMABLE_PROPS = ['transform'];

export default function cssStringify(hash = {}) {
  return htmlSafe(Object.keys(hash).reduce((css, key) => {
    let value = hash[key];

    if (!isEmpty(value)) {
      css = css.concat(buildProp(key, value));
    }

    return css;
  }, []).join('; '));
}

function buildProp(key, value) {
  let css = [`${key}: ${value}`];

  if (TRANSFORMABLE_PROPS.indexOf(key) > -1) {
    PREFIXES.forEach((p) => {
      css.push(`-${p}-${key}: ${value}`);
    });
  }

  return css;
}
