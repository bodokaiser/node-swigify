MOCHA  					= ./node_modules/.bin/mocha
MOCHA_PHANTOMJS = ./node_modules/.bin/mocha-phantomjs
BROWSERIFY			= ./node_modules/.bin/browserify

MOCHA_FLAGS = \
	--reporter spec

BROWSERIFY_FLAGS = \
	--transform lib/index.js \
	--debug

build:
	$(BROWSERIFY) $(BROWSERIFY_FLAGS) \
		opt/test/index.js > opt/test/build.js

test: build
	$(MOCHA_PHANTOMJS) $(MOCHA_FLAGS) \
		opt/test/index.html

clean:
	@rm opt/test/build.js
