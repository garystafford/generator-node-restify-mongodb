/*jslint node: true */
'use strict';

//////////// VARIABLES ///////////////////

let request = require('request');
let should = require('should');
let path = require('path');

let config = require(path.join(__dirname, '../config/config'));
let base_url = ''.concat('http://', config.app.address, ':', config.app.port);


//////////// TESTS ///////////////////////

describe('Utility URIs', function () {
  describe('GET /utils/ping', function () {
    let url = base_url + '/utils/ping';

    let options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'text/plain'
      }
    };

    it('should respond with a status code of 200', function (done) {
      request(options, function (error, response, body) {
        response.statusCode.should.be.exactly(200);
        done();
      });
    });

    it('should respond with \'true\'', function (done) {
      request(options, function (error, response, body) {
        body.should.be.exactly('true');
        done();
      });
    });
  });

  describe('GET /utils/health', function () {
    let url = base_url + '/utils/health';

    let options = {
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

    it('should respond with a \'status\' of \'UP\'', function (done) {
      request(options, function (error, response, body) {
        let status = JSON.parse(body);
        status.should.have.a.property('status', 'UP');
        done();
      });
    });
  });

  describe('GET /utils/info', function () {
    let url = base_url + '/utils/info';

    let options = {
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

    it('should respond with exactly (1) \'info\' object containing (3) properties', function (done) {
      request(options, function (error, response, body) {
        let info = JSON.parse(body);
        Object.keys(info).should.have.a.lengthOf(3);
        done();
      });
    });
  });

  describe('GET /utils/config', function () {
    let url = base_url + '/utils/config';

    let options = {
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

    it('should respond with exactly (1) non-null \'config\' object', function (done) {
      request(options, function (error, response, body) {
        let config = JSON.parse(body);
        config.should.be.an.instanceof(Object).and.not.null;
        done();
      });
    });
  });

  describe('GET /utils/env', function () {
    let url = base_url + '/utils/env';

    let options = {
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

    it('should respond with exactly (1) non-null \'env\' object', function (done) {
      request(options, function (error, response, body) {
        let env = JSON.parse(body);
        env.should.be.an.instanceof(Object).and.not.null;
        done();
      });
    });
  });
});
