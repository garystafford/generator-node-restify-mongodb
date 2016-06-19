var config = require('./config/config');

module.exports = function (grunt) {
  grunt.initConfig({
    mongoimport: {
      options: {
        db: config.db.name,
        host: config.db.host,
        port: config.db.port,
        collections: [{
          name: 'widgets',
          file: 'data/widgets.json',
          jsonArray: true,
          drop: true
        }]
      }
    },
    exec: {
      jshint_test: {
        cmd: 'node_modules/jshint/bin/jshint --verbose app/ config/ app.js *.js'
      },
      jasmine_test: {
        cmd: 'node node_modules/jasmine-node/lib/jasmine-node/cli.js --color --verbose --captureExceptions --forceexit spec'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mongoimport');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['mongoimport', 'exec:jshint_test', 'exec:jasmine_test']);
  grunt.registerTask('test', ['exec:jshint_test', 'exec:jasmine_test']);
};
