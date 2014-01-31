var chai = require('chai');
var swig = require('swig');
var path = require('path');

var simple  = require('../views/simple/hello.html');
var extend  = require('../views/extends/child.html');
var include = require('../views/include/parent.html');

describe('swigify', function() {

  before(function() {
    swig.setDefaults({
      loader: {
        resolve: function(target, source) {
          var dirname = path.dirname(source);

          return path.join(dirname, target);
        },
        load: function(target) {
          if (target.indexOf('.')) {
            target = './' + target;
          }
          return require(target);
        }
      }
    });
  });

  it('should render simple template', function() {
    var result = swig.render(simple, {
      filename: '../views/simple/hello.html'
    });

    chai.expect(result).to.contain('<h1>Hello World!</h1>');
  });

  it('should render included template', function() {
    var name = '../views/include/child.html';

    console.log(require(name));

    var result = swig.render(include, {
      filename: '../views/include/parent.html',
      locals: { name: 'Bodo' }
    });

    chai.expect(result).to.contain('<p>Bodo</p>');
  });

  xit('should render child with extended parent', function() {
    var result = swig.render(extend, {
      filename: '../views/extends/child.html'
    });

    chai.expect(result).to.contain('<body>');
    chai.expect(result).to.contain('<img src="foobar.jpeg" />');
    chai.expect(result).to.contain('</body>');
  });

});
