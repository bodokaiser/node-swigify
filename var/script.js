var swig = require('swig');

var template = {{ compiled }};
var filename = '{{ filename }}';

swig.run(template, {}, filename);

exports.template = template;
exports.filename = filename;
