'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the impeccable ' + chalk.red('generator-node-restify-mongodb') + ' generator!'
    ));
  },
  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      callback: function () {
        console.log('Everything is ready!');
      }
    });
  },
  app: function () {
    this.copy('app.js', 'app.js');
    this.mkdir('app');
    this.mkdir('app/modules');
    this.mkdir('app/routes');
    this.copy('app/modules/index.js', 'app/modules/index.js');
    this.copy('app/modules/widget.js', 'app/modules/widget.js');
    this.copy('app/routes/index.js', 'app/routes/index.js');
    this.copy('app/routes/widget.js', 'app/routes/widget.js');
    this.copy('app/routes/utilities.js', 'app/routes/utilities.js');
  },
  config: function () {
    this.mkdir('config');
    this.copy('config/config.js', 'config/config.js');
  },
  data: function () {
    this.mkdir('data');
    this.copy('data/widgets.json', 'data/widgets.json');
  },
  spec: function () {
    this.mkdir('spec');
    this.copy('spec/utils_spec.js', 'spec/utils_spec.js');
    this.copy('spec/widget_spec.js', 'spec/widget_spec.js');
  },
  grunt: function () {
    this.copy('Gruntfile.js', 'Gruntfile.js');
  },
  projectfiles: function () {
    this.copy('package.json', 'package.json');
    this.copy('db-connection.js', 'db-connection.js');
    this.copy('log.js', 'log.js');
    this.copy('.gitignore', '.gitignore');
    this.copy('.editorconfig', '.editorconfig');
  }
});
