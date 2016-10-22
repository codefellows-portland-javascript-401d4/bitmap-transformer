const read = require('../lib/read.js');
const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');

describe('testing transformation of bitmap', function() {

  beforeEach(function(done) {
    rimraf('./inverted.bmp', done);
    console.log('rimraffed');
  });

  it('adds a transformed image', function(done) {
    function addTest() {
      console.log('addTest running');
      assert.ok(fs.existsSync('./inverted.bmp'));
      done();
    };

    read.readWrite('./non-palette-bitmap.bmp', addTest);


    // console.log('adding image test running');
    // read.readWrite('.non-palette-bitmap.bmp', () => {
    //   assert.ok(fs.existsSync('./inverted.bmp'));
    // });
    // done();
  });


  it('inverts the colors', function(done) {

    function invertTest() {
      console.log('in the invertTest');
      done();
    }

    read.readWrite('./non-palette-bitmap.bmp', invertTest);



  });

  it('produces the same image', function() {

  });

});

