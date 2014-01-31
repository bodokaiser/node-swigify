BUILDER					= ./bin/builder
MOCHA  					= ./node_modules/.bin/mocha
MOCHA_PHANTOMJS = ./node_modules/.bin/mocha-phantomjs

MOCHA_FLAGS = \
	--reporter spec

build:
	$(BUILDER) > opt/test/build.js

test: build
	$(MOCHA_PHANTOMJS) $(MOCHA_FLAGS) \
		opt/test/index.html

clean:
	@rm opt/test/build.js
