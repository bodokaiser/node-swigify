var path    = require('path');
var swig    = require('swig');
var through = require('through');
var html2js = require('html-to-js');

// create new instance which only
// compiles specified control tags
var engine = new swig.Swig({
  tagControls: ['<%>', '%}'],
  varControls: ['<%$', '$%>']
});

module.exports = function(filename) {
  if (!isHTMLFile(filename)) return through();

  var template = '';

  function read(string) {
    template += string;
  }

  function end() {
    // replace start tags to ensure we only
    // render external requires into the template
    var source = template
      .replace('{% block ',    '<%> block ')
      .replace('{% endblock ', '<%> endblock ')
      .replace('{% import ',   '<%> import ')
      .replace('{% include ',  '<%> include ')
      .replace('{% extends ',  '<%> extends ')
      ;

    // render the template with externals
    source = engine.render(source, {
      filename: filename
    });
    // transform to module compatible source
    source = html2js(source);

    this.queue(source);
    this.queue(null);
  }

  return through(read, end);
};

function isHTMLFile(filename) {
  return path.extname(filename) === '.html';
}
