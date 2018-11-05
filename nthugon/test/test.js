const read = require('../lib/read.js');
const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');

describe('testing transformation of bitmap', function() {

  //delete inverted image before each part of test
  beforeEach(function(done) {
    rimraf('./inverted.bmp', done);
  });
  
  //delete inverted image after whole test is done
  after(function(done) {
    rimraf('./inverted.bmp', done);
  });
  
  //test to see whether image is being added
  it('adds a transformed image', function(done) {

    function addTest() {   
      assert.ok(fs.existsSync('./inverted.bmp'));
      done();
    }

    read.readWrite('./non-palette-bitmap.bmp', addTest);

  });

  //test to see whether byte values are being inverted
  it('inverts the colors', function(done) {

    function invertTest() {
      fs.readFile('./non-palette-bitmap.bmp', function(err, data) {
        if (err) throw err;
        //get value of byte 15000
        var byte15k = data[15000];
        //compute inverted value of a byte
        var invertedByte = 255 - byte15k;
        //compare inverted value of byte 15000 to expected value
        assert.deepEqual(invertedByte, read.byte15kInverted);
        done();
      });
    }

    read.readWrite('./non-palette-bitmap.bmp', invertTest);

  });

  it('produces the same image', function(done) {

    function isGolden() {
      fs.readFile('./golden-chicken.bmp', function(err, data) {
        if (err) throw err;
        //get buffer of our standard (golden-chicken) 
        var goldenChickenBuf = Buffer.from(data);
        //check if new buffer is the same as our standard (golden-chicken)
        assert.deepEqual(goldenChickenBuf, read.newBuf);
        done();
      });
    }

    read.readWrite('./non-palette-bitmap.bmp', isGolden);

  });

});

