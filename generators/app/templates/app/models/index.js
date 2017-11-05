/*jslint node: true */
'use strict';

let fs = require('fs');
let path = require('path');

module.exports = function (server) {
  fs.readdirSync(path.join(__dirname, '.')).forEach(function (file) {
    if (file.substr(-3, 3) === '.js' && file !== 'index.js') {
      require('./' + file.replace('.js', ''))(server);
    }
  });
};
