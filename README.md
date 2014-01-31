# swigify

[browserify](https://github.com/substack/browserify) transform for swig
templates.

## Installation

Install with [npm(1)](http://npmjs.org):

    $ npm install swigify

## Preview

Just pass swigify to the `transform` method of your browserify instance.

```
var swigify = require('swigify');

browserify({ entries: ['app.js'] })
  .transform(swigify).bundle()
  .pipe(yourWriteStream);
```

Then require your templates through:

```
var swig = require('swig');

var template = require('./food.html');

var html = swig.render(template, {
  locals: { users: ['apple', 'orange', 'banana'] }
});

document.querySelector('#food').innerHTML = html;
```

**Note:** Support for `extends`, `include` and `import` is currently not
available. But I am working on it.

## License

Copyright © 2013 Bodo Kaiser <i@bodokaiser.io>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
