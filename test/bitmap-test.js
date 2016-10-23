const fs = require('fs');
const assert = require('assert');
const rimraf = require('rimraf');
const bitMapr = require('../bitmapr.js');

//tests
describe('take a bitmap, read the buffer, transform the pixels and write a new file', function() {
  //resetting the images folder after test
  after(function(cb) {
    rimraf('./newImages', cb);
  });
  //test to check if the readBmp function is grabbing the appropriate file
  it('Should take a bmp file and read it to buffer', function(done){
    bitMapr.readBmp('./non-palette-bitmap.bmp', (err, data) => {
      assert.equal(data.length, 30054);
      done();
    });
  });
  it('Should retrieve pixel color values', function(done){
    //testing if the transform function is actually changing a pixel to its inverted color
    let ourBuffer;
    bitMapr.readBmp('./non-palette-bitmap.bmp', (err, data) => {
      if (err) throw err;
      ourBuffer = data;
      bitMapr.transformBuf('greyscale', ourBuffer, (err, data) => {
        assert.equal(data.readUInt8(63), 80);
        done();
      });
    });
  });
  it('Should save a transformed bmp file', function(done){
    //test to make sure that the image is the same as the known golden standard
    bitMapr.readBmp('./non-palette-bitmap.bmp', (err, data) => {
      if (err) throw err;
      ourBuffer = data;
      bitMapr.transformBuf('greyscale', ourBuffer, (err, data) => {
        bitMapr.writeBmp(data, (err,fName) => {
          fs.readFile(fName, function(err, testData) {
            if(err) throw err;
            fs.readFile('./test/testImages/testResultGrey.bmp', function(err, goodData) {
              if(err) throw err;
              assert.deepEqual(testData, goodData);
              done();
            });
          });
        });
      });
      
    });
  })
});