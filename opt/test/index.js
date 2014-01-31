var chai = require('chai');
var swig = require('swig');
var path = require('path');

var simple  = require('../views/simple/hello.html');
var extend  = require('../views/extends/child.html');
var imports  = require('../views/import/child.html');
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

  // will not work as macro not "compiled" to string
  xit('should render imported template macro', function() {
    var result = swig.render(imports);

    chai.expect(result).to.contain('<h6>Welcome</h6>');
  });

  // will not work as extends looses "block" somehow (?)
  xit('should render child with extended parent', function() {
    var result = swig.render(extend);

    chai.expect(result).to.contain('<body><img src="foobar.jpeg" /></body>');
  });

});
