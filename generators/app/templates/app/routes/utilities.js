/*jslint node: true */
'use strict';

var path = require('path');

var config = require(path.join(__dirname, '../../config/config'));

var PATH = '/utils';
var VERSION = '1.0.0';

module.exports = function (server) {
  server.get({path: PATH + '/ping', version: VERSION}, ping);
  server.get({path: PATH + '/health', version: VERSION}, health);
  server.get({path: PATH + '/info', version: VERSION}, information);
  server.get({path: PATH + '/config', version: VERSION}, configuraton);
  server.get({path: PATH + '/env', version: VERSION}, environment);

  function ping(req, res, next) {
    res.send(200, true);
    return next();
  }

  function health(req, res, next) {
    res.json(200, {status: 'UP'});
    return next();
  }

  // Can be found with env URI
  function information(req, res, next) {
    var app_info = {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
      description: process.env.npm_package_description,
      author: process.env.npm_package_author_name
    };
    res.send(200, app_info);
    return next();
  }

  function configuraton(req, res, next) {
    res.send(200, config);
    return next();
  }

  function environment(req, res, next) {
    res.send(200, process.env);
    return next();
  }
};
