/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var path = require('path');

var config = require(path.join(__dirname, '/config/config'));
var log = require(path.join(__dirname, 'log'));

module.exports = function () {
  var db_url = ''.concat('mongodb://', config.db.host, ':', config.db.port, '/', config.db.name);
  mongoose.connect(db_url);
  var db = mongoose.connection;
  // db.on('connected', function () {
  //   log.info('Mongodb connection open to ' + db_url);
  // });
  // db.on('error', function () {
  //   throw new Error('unable to connect to database at ' + db_url);
  // });
  // db.on('disconnected', function () {
  //   log.info('Mongodb connection disconnected');
  // });
  // process.on('SIGINT', function () {
  //   db.close(function () {
  //     log.info('Mongodb connection disconnected through app termination');
  //     process.exit(0);
  //   });
  // });
};
