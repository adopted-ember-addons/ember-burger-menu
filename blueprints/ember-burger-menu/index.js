/*jshint node:true*/

module.exports = {
  normalizeEntityName: function () {},

  afterInstall: function () {
    return this.addPackagesToProject([
      { name: 'ember-cli-sass', target: 'latest' },
    ]);
  },
};
