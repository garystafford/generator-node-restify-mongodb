/*jslint node: true */
'use strict';

let mongoose = require('mongoose');
let path = require('path');
let config = require(path.join(__dirname, '../../config/config'));
let Widget = mongoose.model('Widget');

let PATH = '/widgets';
let VERSION = '1.0.0';

module.exports = function (server) {
  server.get({path: PATH, version: VERSION}, findDocuments);
  server.get({path: PATH + '/:product_id', version: VERSION}, findOneDocument);
  server.post({path: PATH, version: VERSION}, createDocument);
  server.put({path: PATH, version: VERSION}, updateDocument);
  server.del({path: PATH + '/:product_id', version: VERSION}, deleteDocument);

  function findDocuments(req, res, next) {
    // http://mongoosejs.com/docs/api.html#model_Model.find
    let conditions = {};
    let projection = {};
    let options = {};

    Widget.find(conditions, projection, options).sort({'name': 1}).exec(function (error, widgets) {
      if (error) {
        return next(error);
      } else {
        res.header('X-Total-Count', widgets.length);
        res.send(200, widgets);
        return next();
      }
    });
  }

  function findOneDocument(req, res, next) {
    // http://mongoosejs.com/docs/api.html#model_Model.findOne
    let conditions = {'product_id': req.params.product_id};
    let projection = {};
    let options = {};

    Widget.findOne(conditions, projection, options, function (error, widget) {
      if (error) {
        return next(error);
      } else {
        res.send(200, widget);
        return next();
      }
    });
  }

  function createDocument(req, res, next) {
    let widget = new Widget({
      product_id: req.body.product_id,
      name: req.body.name,
      color: req.body.color,
      size: req.body.size,
      price: req.body.price,
      inventory: req.body.inventory
    });

    // http://mongoosejs.com/docs/api.html#model_Model-save
    widget.save(function (error, widget, numAffected) {
      if (error) {
        return next(error);
      } else {
        res.send(204);
        return next();
      }
    });
  }

  function updateDocument(req, res, next) {
    // http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
    let conditions = {'product_id': req.body.product_id};
    let update = {
      'name': req.body.name,
      'color': req.body.color,
      'size': req.body.size,
      'price': req.body.price,
      'inventory': req.body.inventory
    };
    let options = {runValidators: true, context: 'query'};

    Widget.findOneAndUpdate(conditions, update, options, function (error) {
      if (error) {
        return next(error);
      } else {
        res.send(204);
        return next();
      }
    });
  }

  function deleteDocument(req, res, next) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    let options = {'product_id': req.params.product_id};

    Widget.remove(options, function (error) {
      if (error) {
        return next(error);
      } else {
        res.send(204);
        return next();
      }
    });
  }
};
