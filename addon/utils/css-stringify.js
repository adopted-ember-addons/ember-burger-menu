import { isEmpty } from '@ember/utils';
import { dasherize, htmlSafe } from '@ember/string';

const PREFIXES = ['webkit'];
const PREFIXED_PROPS = [
  'transition',
  'transition-timing-function',
  'transition-property',
  'transition-speed',
  'transition-delay',
  'transform',
  'transform-style',
  'transform-origin',
  'perspective',
  'perspective-origin',
];

export default function cssStringify(hash = {}) {
  return htmlSafe(
    Object.keys(hash)
      .reduce((css, key) => {
        let value = hash[key];

        if (!isEmpty(value)) {
          css = css.concat(buildProp(key, value));
        }

        return css;
      }, [])
      .join('; ')
  );
}

function buildProp(key, value) {
  key = dasherize(key);
  let css = [`${key}: ${value}`];

  if (PREFIXED_PROPS.indexOf(key) > -1) {
    PREFIXES.forEach((p) => {
      css.push(`-${p}-${key}: ${value}`);
    });
  }

  return css;
}
