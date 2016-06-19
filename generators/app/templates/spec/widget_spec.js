/*jslint node: true */
'use strict';

//////////// VARIABLES ///////////////////

var request = require('request');
var mongoose = require('mongoose');
var should = require('should');
var path = require('path');

var config = require(path.join(__dirname, '../config/config'));
var base_url = ''.concat('http://', config.app.address, ':', config.app.port);

var dbConnection = require(path.join(__dirname, '../db-connection'));
dbConnection();

var widget_model = require(path.join(__dirname, '../app/models/widget'));
widget_model();

var Widget = mongoose.model('Widget');

var log = require(path.join(__dirname, '../log'));


//////////// HELPER FUNCTIONS ////////////

function saveWidget(widget, done) {
  widget.save(function (error) {
    if (error) {
      log.error(error);
    } else {
      done();
    }
  });
}

function removeWidgets(options, done) {
  Widget.remove(options, function (error) {
    if (error) {
      log.error(error);
    } else {
      done();
    }
  });
}


//////////// TESTS ///////////////////////

// find all widgets
describe('Widget URIs', function () {
  describe('GET /widgets', function () {
    beforeEach(function (done) {
      removeWidgets({}, done);

      saveWidget(new Widget({
        product_id: 'YMIYW2VROS',
        name: 'TestWidget_YMIYW2VROS',
        color: 'Black',
        size: 'Huge',
        price: '$99.99',
        inventory: 96
      }), done);

      saveWidget(new Widget({
        product_id: 'FGBRYL6XSF',
        name: 'TestWidget_FGBRYL6XSF',
        color: 'Red',
        size: 'Huge',
        price: '$127.49',
        inventory: 1205
      }), done);

      saveWidget(new Widget({
        product_id: '5H7HW8Y1E2',
        name: 'TestWidget_5H7HW8Y1E2',
        color: 'Black',
        size: 'Tiny',
        price: '$1.49',
        inventory: 0
      }), done);
    });

    afterEach(function (done) {
      removeWidgets({}, done);
    });

    var url = base_url + '/widgets';

    var options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'application/json'
      }
    };

    it('should respond with a status code of 200', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(200);
        done();
      });
    });

    it('should respond with exactly (3) widget objects in an array', function (done) {
      request(options, function (error, response, body) {
        var widget = JSON.parse(body);
        widget.should.be.an.instanceof(Array).and.have.a.lengthOf(3);
        done();
      });
    });

    it('should respond with an \'x-total-count\' header containing a value of \'3\'', function (done) {
      request(options, function (error, response, body) {
        response.headers.should.have.a.property('x-total-count', '3');
        done();
      });
    });
  });

  // find one widget
  describe('GET /widgets/:product_id', function () {
    beforeEach(function (done) {
      removeWidgets({}, done);

      saveWidget(new Widget({
        product_id: '4YFZH127BX',
        name: 'TestWidget_4YFZH127BX',
        color: 'Orange',
        size: 'Small',
        price: '$19.93',
        inventory: 13
      }), done);

      saveWidget(new Widget({
        product_id: '0EJLZK6BK8',
        name: 'TestWidget_0EJLZK6BK8',
        color: 'Red',
        size: 'Huge',
        price: '$137.49',
        inventory: 46
      }), done);
    });

    afterEach(function (done) {
      removeWidgets({}, done);
    });

    var url1 = base_url + '/widgets/4YFZH127BX';

    var options1 = {
      method: 'GET',
      url: url1,
      headers: {
        accept: 'application/json'
      }
    };

    it('should respond with a status code of 200', function (done) {
      request(options1, function (error, response, body) {
        response.statusCode.should.be.exactly(200);
        done();
      });
    });

    it('should respond with exactly (1) widget object', function (done) {
      request(options1, function (error, response, body) {
        var widget = JSON.parse(body);
        widget.should.be.an.instanceof(Object);
        done();
      });
    });

    it('should respond with the value of \'TestWidget_4YFZH127BX\' for \'name\' key', function (done) {
      request(options1, function (error, response, body) {
        var widget = JSON.parse(body);
        widget.should.have.a.property('name', 'TestWidget_4YFZH127BX');
        done();
      });
    });

    var url2 = base_url + '/widgets/BADPRODUCT';

    var options2 = {
      method: 'GET',
      url: url2,
      headers: {
        accept: 'application/json'
      }
    };

    it('should respond with \'null\' when the \'product_id\' is not found', function (done) {
      request(options2, function (error, response, body) {
        body.should.be.null;
        done();
      });
    });
  });

  // create new widget
  describe('POST /widgets', function () {
    beforeEach(function (done) {
      removeWidgets({}, done);
    });
    afterEach(function (done) {
      removeWidgets({}, done);
    });

    var widget = {
      product_id: 'DC3NHTGNAY',
      name: 'TestWidget_DC3NHTGNAY',
      color: 'Green',
      size: 'Big',
      price: '$79.92',
      inventory: 27
    };

    var url = base_url + '/widgets';

    var options = {
      method: 'POST',
      url: url,
      headers: {
        accept: 'application/json'
      },
      body: widget,
      json: true
    };

    it('should respond with a status code of 201', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(201);
        done();
      });
    });

    it('should respond with exactly (1) widget object', function (done) {
      request(options, function (error, response, body) {
        body.should.be.an.instanceof(Object);
        done();
      });
    });

    it('should respond with a value of \'TestWidget_DC3NHTGNAY\' for \'name\' key', function (done) {
      request(options, function (error, response, body) {
        body.should.have.a.property('name', 'TestWidget_DC3NHTGNAY');
        done();
      });
    });
  });

  // create new widget
  describe('POST /widgets', function () {
    beforeEach(function (done) {
      removeWidgets({}, done);
    });
    afterEach(function (done) {
      removeWidgets({}, done);
    });

    var widget = { // no 'name' key
      product_id: 'DC3NHTGNAY',
      color: 'Green',
      size: 'Big',
      price: '$79.92',
      inventory: 27
    };

    var url = base_url + '/widgets';

    var options = {
      method: 'POST',
      url: url,
      headers: {
        accept: 'application/json'
      },
      body: widget,
      json: true
    };

    it('should respond with a status code of 500 when missing \'name\' property', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(500);
        done();
      });
    });

    it('should respond with an error message: \'Widget validation failed\' when missing \'name\' property', function (done) {
      request(options, function (error, response, body) {
        body.should.have.a.property('message', 'Widget validation failed');
        done();
      });
    });
  });

  // update one widget
  describe('PUT /widgets', function () {
    beforeEach(function (done) {
      removeWidgets({}, done);

      saveWidget(new Widget({
        product_id: 'ZC7DV7BSPE',
        name: 'TestWidget_ZC7DV7BSPE',
        color: 'Blue',
        size: 'Small',
        price: '$9.92',
        inventory: 27
      }), done);
    });

    afterEach(function (done) {
      removeWidgets({}, done);
    });

    var widget = { // modified inventory level
      product_id: 'ZC7DV7BSPE',
      name: 'TestWidget_ZC7DV7BSPE',
      color: 'Blue',
      size: 'Small',
      price: '$9.92',
      inventory: 21
    };

    var url = base_url + '/widgets';

    var options = {
      method: 'PUT',
      url: url,
      headers: {
        accept: 'application/json'
      },
      body: widget,
      json: true
    };

    it('should respond with a status code of 200', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(200);
        done();
      });
    });

    it('should respond with no response body', function (done) {
      request(options, function (error, response, body) {
        response.should.not.have.a.property('body');
        done();
      });
    });
  });

  // update and confirm one widget
  describe('PUT /widgets', function () {
    beforeEach(function (done) {
      removeWidgets({}, done);

      saveWidget(new Widget({
        product_id: 'ZC7DV7BSPE',
        name: 'TestWidget_ZC7DV7BSPE',
        color: 'Blue',
        size: 'Small',
        price: '$9.92',
        inventory: 27
      }), done);

      var widget = { // modified inventory level
        product_id: 'ZC7DV7BSPE',
        name: 'TestWidget_ZC7DV7BSPE',
        color: 'Blue',
        size: 'Small',
        price: '$9.92',
        inventory: 21
      };

      var url1 = base_url + '/widgets';

      var options1 = {
        method: 'PUT',
        url: url1,
        headers: {
          accept: 'application/json'
        },
        body: widget,
        json: true
      };

      request(options1, function (error, response, body) {
        done();
      });
    });

    afterEach(function (done) {
      removeWidgets({}, done);
    });

    var url2 = base_url + '/widgets/ZC7DV7BSPE';

    var options2 = {
      method: 'GET',
      url: url2,
      headers: {
        accept: 'application/json'
      }
    };

    it('should respond with new value of \'21\' for \'inventory\' key', function (done) {
      request(options2, function (error, response, body) {
        var widget = JSON.parse(body);
        widget.should.have.a.property('inventory', 21);
        done();
      });
    });
  });

  // delete one widget
  describe('DELETE /widgets/:product_id', function () {
    beforeEach(function (done) {
      removeWidgets({}, done);

      saveWidget(new Widget({
        product_id: '3NDO87DF3C',
        name: 'TestWidget_3NDO87DF3C',
        color: 'Green',
        size: 'Small',
        price: '$71.95',
        inventory: 653
      }), done);
    });

    afterEach(function (done) {
      removeWidgets({}, done);
    });

    var url = base_url + '/widgets/3NDO87DF3C';

    var options = {
      method: 'DELETE',
      url: url,
      headers: {
        accept: 'application/json'
      }
    };

    it('should respond with a status code of 204', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(204);
        done();
      });
    });

    it('should respond with an empty response body', function (done) {
      request(options, function (error, response, body) {
        body.should.be.exactly('');
        done();
      });
    });
  });
});

