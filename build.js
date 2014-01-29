var browserify = require('browserify');

var options = {
  debug: true,
  entries: ['./opt/test/index.js']
};


var builder = browserify(options).transform(require('./lib'));

var bundle = builder.bundle().on('error', function(e) { console.log(e) });
