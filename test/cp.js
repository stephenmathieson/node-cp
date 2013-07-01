var cp = require('..')
  , path = require('path')
  , fs = require('fs')
  , assert = require('assert')
  , glob = require('glob');

function fixture(name) {
  return path.join(__dirname, 'fixtures', name);
}

function cleanup() {
  var i
    , files = glob.sync(fixture('*copy*'));

  for (i = files.length - 1; i >= 0; i--) {
    fs.unlinkSync(files[i]);
  }
}


describe('cp', function () {

  beforeEach(cleanup);
  after(cleanup);

  it('should be a function', function () {
    cp.should.be.a.function;
  });

  describe('cp(src, dest, cb)', function () {
    it('should copy existing files', function (done) {
      cp(fixture('a.txt'), fixture('a-copy.txt'), function (err) {
        if (err) {
          return done(err);
        }

        fs.readFileSync(fixture('a-copy.txt')).toString().should.be.equal('a');
        done();
      });
    });

    it('should fail on non-existant files', function (done) {
      cp(fixture('not real'), fixture('not real copy'), function (err) {
        err.should.be.an.instanceof(Error);
        done();
      });
    });
  });

  describe('cp.sync(src, dest)', function () {
    it('should copy existing files', function () {
      cp.sync(fixture('a.txt'), fixture('a-copy.txt'));
      fs.readFileSync(fixture('a-copy.txt')).toString().should.be.equal('a');
    });

    it('should fail on non-existant files', function () {
      assert.throws(function () {
        cp.sync(fixture('not real'), fixture('not real copy'));
      });
    });
  });

});
