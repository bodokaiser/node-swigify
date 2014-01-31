var chai = require('chai');
var swig = require('swig');
var path = require('path');

var simple  = require('../views/simple/hello.html');
var extend  = require('../views/extends/child.html');
var include = require('../views/include/parent.html');

describe('swigify', function() {

  it('should render simple template', function() {
    var result = swig.render(simple);

    chai.expect(result).to.contain('<h1>Hello World!</h1>');
  });

  it('should render included template', function() {
    var result = swig.render(include, {
      locals: { name: 'Bodo' }
    });

    chai.expect(result).to.contain('<div id="parent"><p>Bodo</p></div>');
  });

  xit('should render child with extended parent', function() {
    var result = swig.render(extend);

    chai.expect(result).to.contain('<body><img src="foobar.jpeg" /></body>');
  });

});
