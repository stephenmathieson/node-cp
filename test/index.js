
var assert = require('assert');
var path = require('path');
var fixture = path.join.bind(path, __dirname, 'fixtures');
var fs = require('fs');
var glob = require('glob').sync;
var cp = require('..');

describe('cp(src, dest, fn)', function() {
  beforeEach(cleanup);

  it('should copy files', function(done) {
    cp(fixture('a.txt'), fixture('a-copy.txt'), function(err) {
      if (err) return done(err);
      var str = fs.readFileSync(fixture('a-copy.txt'), 'utf8');
      assert('a' == str);
      done();
    });
  });

  it('should propagate fs errors', function(done) {
    cp(fixture('nope'), fixture('nope copy'), function(err) {
      assert(err);
      done();
    });
  });
});

describe('yield cp(src, dest)', function() {
  beforeEach(cleanup);

  it('should copy files', function*() {
    yield cp(fixture('a.txt'), fixture('a-copy.txt'));
    var str = fs.readFileSync(fixture('a-copy.txt'), 'utf8');
    assert('a' == str);
  });

  it('should propagate fs errors', function*() {
    var err;
    try {
      yield cp(fixture('nope'), fixture('nope copy'));
    } catch (e) {
      err = e;
    }
    assert(err);
  });
});

describe('cp.sync(src, dest)', function() {
  beforeEach(cleanup);

  it('should copy files', function() {
    cp.sync(fixture('a.txt'), fixture('a-copy.txt'));
    var str = fs.readFileSync(fixture('a-copy.txt'), 'utf8');
    assert('a' == str);
  });

  it('should propagate fs errors', function() {
    assert.throws(function() {
      cp.sync(fixture('nope'), fixture('nope copy'));
    });
  });
});

function cleanup() {
  var files = glob(fixture('*copy*'));
  for (var i = files.length - 1; i >= 0; i--) {
    fs.unlinkSync(files[i]);
  }
}
