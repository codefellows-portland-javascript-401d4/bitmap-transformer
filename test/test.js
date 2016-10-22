const read = require('../lib/read.js');
const assert = require('assert');
const fs = require('fs');

describe('testing transformation of bitmap', function() {


  it('inverts the colors', function(done) {

    function invertTest() {
      console.log('in the invertTest');
      done();
    }

    read.readBitFile(invertTest);



  });

  it('produces the same image', function() {

  });

});

