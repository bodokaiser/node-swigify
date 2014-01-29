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
    var result, source = '';

    while (result = regex.exec(template)) {
      source += 'require(\'';
      source += result[1];
      source += '\');\n';
    }

    source += html2js(template);

    this.queue(source);
    this.queue(null);
  }

  return through(read, end);
};

function isHTMLFile(filename) {
  return path.extname(filename) === '.html';
}
