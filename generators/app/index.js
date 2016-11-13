'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Node-Restify-MongoDB') + ' Generator!'
    ));
  },
  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      callback: function () {
        console.log('npm dependencies installed!');
      }
    });
  },
  app: function () {
    this.copy('app.js', 'app.js');
    mkdirp('app/models');
    mkdirp('app/routes');
    this.copy('app/models/index.js', 'app/models/index.js');
    this.copy('app/models/widget.js', 'app/models/widget.js');
    this.copy('app/routes/index.js', 'app/routes/index.js');
    this.copy('app/routes/widget.js', 'app/routes/widget.js');
    this.copy('app/routes/utilities.js', 'app/routes/utilities.js');
  },
  config: function () {
    mkdirp('config');
    this.copy('config/config.js', 'config/config.js');
  },
  data: function () {
    mkdirp('data');
    this.copy('data/widgets.json', 'data/widgets.json');
  },
  spec: function () {
    mkdirp('spec');
    this.copy('spec/utils_spec.js', 'spec/utils_spec.js');
    this.copy('spec/widget_spec.js', 'spec/widget_spec.js');
  },
  postman: function () {
    mkdirp('spec');
    this.copy('postman/localhost-restify.postman_environment.json',
      'postman/localhost-restify.postman_environment.json');
    this.copy('postman/Widgets.postman_collection.json',
      'postman/Widgets.postman_collection.json');
  },
  grunt: function () {
    this.copy('Gruntfile.js', 'Gruntfile.js');
  },
  projectfiles: function () {
    this.copy('package.json', 'package.json');
    this.copy('db-connection.js', 'db-connection.js');
    this.copy('log.js', 'log.js');
    this.copy('.npmignore', '.npmignore');
    this.copy('.gitignore', '.gitignore');
    //npm renames .gitignore in .npmignore when publishing,
    //so rename back to .gitignore
    if (this.fs.exists(this.templatePath('.npmignore'))) {
      this.fs.copy('.npmignore', '.gitignore');
    }
    this.copy('.editorconfig', '.editorconfig');
  }
});
