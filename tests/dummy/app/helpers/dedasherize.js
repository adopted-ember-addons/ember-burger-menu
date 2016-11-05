import Ember from 'ember';

export function dedasherize([ str = '' ]/*, hash*/) {
  return str.replace('-', ' ');
}

export default Ember.Helper.helper(dedasherize);
