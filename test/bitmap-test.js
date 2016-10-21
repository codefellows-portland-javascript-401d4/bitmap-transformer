var fs = require('fs');
var assert = require('assert');
var bitMapr = require('../bitmapr.js');

describe('take a bitmap, read the buffer, transform the pixels and write a new file', function() {
  it('Should take a bmp file and read it to buffer', function(done){
    bitMapr.readBmp('./non-palette-bitmap.bmp', (err, data) => {
      assert.equal(data.length, 30054);
      done();
    });
  });

  it('Should retrieve pixel color values', function(done){
    
  })
});