var chai = require('chai');
var swig = require('swig');
var path = require('path');

var simple = require('./templates/simple.html');

describe('swigify', function() {

  it('should render simple template', function() {
    var result = swig.render(simple.template, {
      filename: simple.filename
    });

    chai.expect(result).to.equal('<h1>Hello World!</h1>');
  });

});
