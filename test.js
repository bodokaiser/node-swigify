var browserify = require('browserify');

browserify({ entries: ['./opt/test/index.js'] })
  .transform(require('./lib')).bundle().on('error', function(e) {
    console.log(e);
  });
