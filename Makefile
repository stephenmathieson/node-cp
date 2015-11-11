
BIN := node_modules/.bin
NODE ?= node
SRC = $(wildcard *.js)
TEST = $(wildcard test/*.js)

test: node_modules
	$(NODE) $(BIN)/_mocha \
	  --reporter spec \
	  --require co-mocha

node_modules: package.json
	npm install
	@touch $@

clean:
	rm -f test/fixtures/*copy*

.PHONY: test clean
