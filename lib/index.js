var util     = require('util');
var path     = require('path');
var swig     = require('swig');
var through  = require('through');
var html2js  = require('html-to-js');
var minifier = require('html-minifier');

const TAGNAMES = [
  'import', 'include', 'extends', 'block', 'endblock'
];

const NEW_VAR_CONTROLS = [
  '<$', '$>'
];

const NEW_TAG_CONTROLS = [
  '<%', '%}'
];

const OLD_TAG_CONTROLS = [
  '{%', '%}'
];

module.exports = function(options) {
  options = options || {};

  if (options && typeof options.compress !== 'object') {
    options.compress = {
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeEmptyAttributes: true,
      removeComments: true,
      removeCommentsFromCDATA: true
    };
  }
  if (!options.tagnames) {
    options.tagnames = TAGNAMES;
  }
  if (!options.newVarControls) {
    options.newVarControls = NEW_VAR_CONTROLS;
  }
  if (!options.newTagControls) {
    options.newTagControls = NEW_TAG_CONTROLS;
  }
  if (!options.oldTagControls) {
    options.oldTagControls = OLD_TAG_CONTROLS;
  }

  var engine = createEngine(options);

  return function(filename) {
    if (path.extname(filename) !== '.html') return through();

    var template = '';

    function read(string) {
      template += string;
    }

    function end() {
      var source = replaceTagnames(template, options);

      // render the template with externals
      source = engine.render(source, {
        filename: filename
      });
      // compress source if defined in options
      source = compress(source, options);
      // transform to module compatible source
      source = html2js(source);

      this.queue(source);
      this.queue(null);
    }

    return through(read, end);
  }
};

function createEngine(options) {
  return new swig.Swig({
    varControls: options.newVarControls,
    tagControls: options.newTagControls
  });
}

function replaceTagnames(source, options) {
  options.tagnames.forEach(function(tagname) {
    var query = util.format('%s %s', options.oldTagControls[0], tagname);
    var replace = util.format('%s %s', options.newTagControls[0], tagname);

    source = source.replace(query, replace);
  });

  return source;
}

function compress(source, options) {
  if (!options.compress) return source;

  return minifier.minify(source, options.compress);
}

