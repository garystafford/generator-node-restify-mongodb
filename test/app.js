/* global describe, beforeEach, it */
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

const expectedFiles = {
  app: [
    'app.js',
    'app/models/index.js',
    'app/models/widget.js',
    'app/routes/index.js',
    'app/routes/widget.js',
    'app/routes/utilities.js'
  ],
  config: [
    'config/config.js'
  ],
  data: [
    'data/widgets.json'
  ],
  spec: [
    'spec/utils_spec.js',
    'spec/widget_spec.js'
  ],
  postman: [
    'postman/localhost-restify.postman_environment.json',
    'postman/Widgets.postman_collection.json'
  ],
  grunt: [
    'Gruntfile.js'
  ],
  projectfiles: [
    'package.json',
    'db-connection.js',
    'log.js',
    '.gitignore',
    '.editorconfig'
  ]
};

describe('generator-node-restify-mongodb:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .toPromise();
  });

  it('can be imported without blowing up', function () {
    var app = require('../generators/app');
    assert(app !== undefined);
  });

  it('creates expected default files', function () {
    assert.file(expectedFiles.app);
    assert.file(expectedFiles.config);
    assert.file(expectedFiles.data);
    assert.file(expectedFiles.spec);
    assert.file(expectedFiles.postman);
    assert.file(expectedFiles.grunt);
    assert.file(expectedFiles.projectfiles);
  });
})
;
