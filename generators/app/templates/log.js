/*jslint node: true */
'use strict';

var bunyan = require('bunyan');
var path = require('path');

var config = require(path.join(__dirname, '/config/config'));

var log = bunyan.createLogger({
  name: config.log.name,
  level: config.log.level,
  stream: process.stdout,
  serializers: bunyan.stdSerializers
});

module.exports = log;
