/*jslint node: true */
'use strict';

var restify = require('restify');
var path = require('path');

var config = require(path.join(__dirname, '/config/config'));
var log = require(path.join(__dirname, '/log'));
var models = require(path.join(__dirname, '/app/models/'));
var routes = require(path.join(__dirname, '/app/routes/'));
var dbConnection = require(path.join(__dirname, '/db-connection'));

dbConnection();

var server = restify.createServer({
  name: config.app.name,
  log: log
});

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.pre(restify.pre.sanitizePath());
server.use(
  function crossOrigin(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    return next();
  }
);

/*jslint unparam:true*/
// Default error handler. Personalize according to your needs.
server.on('uncaughtException', function (req, res, route, err) {
  log.info('******* Begin Error *******\n%s\n*******\n%s\n******* End Error *******', route, err.stack);
  if (!res.headersSent) {
    return res.send(500, {ok: false});
  }
  res.write('\n');
  res.end();
});

server.on('after', restify.auditLogger({log: log}));

models();
routes(server);

server.get('/', function (req, res, next) {
  res.send(config.app.name);
  return next();
});

server.listen(config.app.port, function () {
  log.info('Application %s listening at %s:%s', config.app.name, config.app.address, config.app.port);
});
