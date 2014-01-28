var chai = require('chai');
var swig = require('swig');
var path = require('path');

var simple = require('./templates/simple.html');

describe('swigify', function() {

  before(function() {
    swig.setDefaults({
      loader: {
        resolve: resolve,
        load: load
      }
    });
  });

  it('should render simple template', function() {
    var result = swig.render(simple, {
      filename: './templates/simple.html'
    });

    chai.expect(result).to.contain('<h1>Hello World!</h1>');
  });

});

function resolve(target, source) {
  var dirname = path.dirname(source);

  return path.join(dirname, target);
}

function load(target) {
  return require('./' + target);
}
