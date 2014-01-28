var fs      = require('fs');
var path    = require('path');
var swig    = require('swig');
var through = require('through');

var script = readFileSync('/../var/script.js');

module.exports = function(filename) {
  var template = '';

  if (!isHTMLFile(filename)) {
    return through();
  }

  function read(string) {
    template += string;
  }

  function end() {
    try {
      // precompile the required template
      var compiled = swig.precompile(template, {
        filename: filename
      }).tpl;
      // replace placeholders in script
      var source = script
        .replace('{{ compiled }}', compiled.toString())
        .replace('{{ filename }}', filename);
    } catch(e) {
      this.emit('error', e);
    }

    this.queue(source);
    this.queue(null);
  }

  return through(read, end);
};

function readFileSync(filename) {
  return fs.readFileSync(path.join(__dirname, filename)).toString();
}

function isHTMLFile(filename) {
  return /\.[0-9a-z]+$/i.exec(filename).pop() === '.html';
}
