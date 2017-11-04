'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Node-Restify-MongoDB') + ' Generator!'
    ));
  }

  install() {
    this.installDependencies({
      bower: false,
      yarn: {force: true},
      npm: false
    }).then(() => console.log('npm dependencies installed!'))
  }

  app() {
    console.log(this.projectfiles());
    console.log(this.destinationPath());
    this.fs.copy('app.js', 'app.js');
    mkdirp('app/models');
    mkdirp('app/routes');
    this.fs.copy('app/models/index.js', 'app/models/index.js');
    this.fs.copy('app/models/widget.js', 'app/models/widget.js');
    this.fs.copy('app/routes/index.js', 'app/routes/index.js');
    this.fs.copy('app/routes/widget.js', 'app/routes/widget.js');
    this.fs.copy('app/routes/utilities.js', 'app/routes/utilities.js');
  }

  config() {
    mkdirp('config');
    this.fs.copy('config/config.js', 'config/config.js');
  }

  data() {
    mkdirp('data');
    this.fs.copy('data/widgets.json', 'data/widgets.json');
  }

  spec() {
    mkdirp('spec');
    this.fs.copy('spec/utils_spec.js', 'spec/utils_spec.js');
    this.fs.copy('spec/widget_spec.js', 'spec/widget_spec.js');
  }

  postman() {
    mkdirp('spec');
    this.fs.copy('postman/localhost-restify.postman_environment.json',
      'postman/localhost-restify.postman_environment.json');
    this.fs.copy('postman/Widgets.postman_collection.json',
      'postman/Widgets.postman_collection.json');
  }

  grunt() {
    this.fs.copy('Gruntfile.js', 'Gruntfile.js');
  }

  projectfiles() {
    this.fs.copy('package.json', 'package.json');
    this.fs.copy('db-connection.js', 'db-connection.js');
    this.fs.copy('log.js', 'log.js');
    this.fs.copy('.npmignore', '.npmignore');
    this.fs.copy('.gitignore', '.gitignore');
    //npm renames .gitignore in .npmignore when publishing,
    //so rename back to .gitignore
    if (this.fs.exists(this.templatePath('.npmignore'))) {
      this.fs.copy('.npmignore', '.gitignore');
    }
    this.fs.copy('.editorconfig', '.editorconfig');
  }
};
