var path    = require('path');
var through = require('through');
var html2js = require('html-to-js');

var regex = /{% (?:include|import|extends) '([^']+)' %}/gi;

module.exports = function(filename) {
  if (!isHTMLFile(filename)) return through();

  var template = '';

  function read(string) {
    template += string;
  }

  function end() {
    var source = html2js(template);

    /*
    var result;
    while (result = regex.exec(source)) {
      var dirname = path.dirname(filename);

      builder.require(path.join(dirname, result[1]));
    }
    */

    this.queue(source);
    this.queue(null);
  }

  return through(read, end);
};

function isHTMLFile(filename) {
  return path.extname(filename) === '.html';
}
