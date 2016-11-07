/* jshint node:true */
var generateChangelog = require('ember-addon-genie/lib/tasks/generate-changelog');
var publishToGhPages = require('ember-addon-genie/lib/tasks/publish-to-gh-pages');
// var RSVP = require('rsvp');

// For details on each option run `ember help release`
module.exports = {
  beforeCommit: generateChangelog,
  afterPublish: publishToGhPages,
  // local: true,
  // remote: 'some_remote',
  // annotation: "Release %@",
  // message: "Bumped version to %@",
  // manifest: [ 'package.json', 'bower.json', 'someconfig.json' ],
  publish: true
  // strategy: 'date',
  // format: 'YYYY-MM-DD',
  // timezone: 'America/Los_Angeles',
  //
  // beforeCommit: function(project, versions) {
  //   return new RSVP.Promise(function(resolve, reject) {
  //     // Do custom things here...
  //   });
  // }
};
