'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Node-Restify-MongoDB v0.3.0') + ' Generator!'
    ));
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true
    }).then(() => console.log('npm dependencies installed!'))
  }

  app() {
    this.fs.copy(this.templatePath('app.js'), this.destinationPath('app.js'));
    mkdirp('app/models');
    mkdirp('app/routes');
    this.fs.copy(this.templatePath('app/models/index.js'), this.destinationPath('app/models/index.js'));
    this.fs.copy(this.templatePath('app/models/widget.js'), this.destinationPath('app/models/widget.js'));
    this.fs.copy(this.templatePath('app/routes/index.js'), this.destinationPath('app/routes/index.js'));
    this.fs.copy(this.templatePath('app/routes/widget.js'), this.destinationPath('app/routes/widget.js'));
    this.fs.copy(this.templatePath('app/routes/utilities.js'), this.destinationPath('app/routes/utilities.js'));
  }

  config() {
    mkdirp('config');
    this.fs.copy(this.templatePath('config/config.js'), this.destinationPath('config/config.js'));
  }

  data() {
    mkdirp('data');
    this.fs.copy(this.templatePath('data/widgets.json'), this.destinationPath('data/widgets.json'));
  }

  spec() {
    mkdirp('spec');
    this.fs.copy(this.templatePath('spec/utils_spec.js'), this.destinationPath('spec/utils_spec.js'));
    this.fs.copy(this.templatePath('spec/widget_spec.js'), this.destinationPath('spec/widget_spec.js'));
  }

  postman() {
    mkdirp('spec');
    this.fs.copy(this.templatePath('postman/localhost-restify.postman_environment.json'),
      this.destinationPath('postman/localhost-restify.postman_environment.json'));
    this.fs.copy(this.templatePath('postman/Widgets.postman_collection.json'),
      this.destinationPath('postman/Widgets.postman_collection.json'));
  }

  grunt() {
    this.fs.copy(this.templatePath('Gruntfile.js'), this.destinationPath('Gruntfile.js'));
  }

  projectfiles() {
    this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
    this.fs.copy(this.templatePath('db-connection.js'), this.destinationPath('db-connection.js'));
    this.fs.copy(this.templatePath('log.js'), this.destinationPath('log.js'));
    this.fs.copy(this.templatePath('.npmignore'), this.destinationPath('.npmignore'));
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('.jshintrc'), this.destinationPath('.jshintrc'));
    //npm renames .gitignore in .npmignore when publishing,
    //so rename back to .gitignore
    if (this.fs.exists(this.templatePath('.npmignore'))) {
      this.fs.copy(this.templatePath('.npmignore'), this.destinationPath('.gitignore'));
    }
    this.fs.copy(this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));
  }
};
