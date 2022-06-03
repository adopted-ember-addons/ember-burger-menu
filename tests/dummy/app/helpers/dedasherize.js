import { helper } from '@ember/component/helper';

export function dedasherize([str = ''] /*, hash*/) {
  return str.replace('-', ' ');
}

export default helper(dedasherize);
