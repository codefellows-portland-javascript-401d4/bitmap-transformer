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
    let ourBuffer;
    bitMapr.readBmp('./non-palette-bitmap.bmp', (err, data) => {
      if (err) throw err;
      ourBuffer = data;
      bitMapr.transformBuf('invert', ourBuffer, (err, data) => {
        assert.equal(data.readUInt8(63), 139);
        done();
      });
    });
  });
  it('Should save a transformed bmp file', function(done){
    bitMapr.readBmp('./non-palette-bitmap.bmp', (err, data) => {
      if (err) throw err;
      ourBuffer = data;
      bitMapr.transformBuf('invert', ourBuffer, (err, data) => {
        bitMapr.writeBmp(data, (err,fName) => {
          fs.readFile(fName, function(err, testData) {
            if(err) throw err;
            fs.readFile('./testResult.bmp', function(err, goodData) {
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

// var fs = require('fs');
// var assert = require('assert');
// var bitMapr = require('../bitmapr.js');

// describe('take a bitmap, read the buffer, transform the pixels and write a new file', function() {
//   it('Should take a bmp file and read it to buffer', function(done){
//     bitMapr.readBmp('./non-palette-bitmap.bmp', (err, data) => {
//       assert.equal(data.length, 30054);
//       done();
//     });
//   });
//   it('Should retrieve pixel color values', function(done){
//     let ourBuffer;
//     bitMapr.readBmp('./non-palette-bitmap.bmp', (err, data) => {
//       if (err) throw err;
//       ourBuffer = data;
//       bitMapr.transformBuf('greyscale', ourBuffer, (err, data) => {
//         assert.equal(data.readUInt8(63), 80);
//         done();
//       });
//     });
//   });
//   it('Should save a transformed bmp file', function(done){
//     bitMapr.readBmp('./non-palette-bitmap.bmp', (err, data) => {
//       if (err) throw err;
//       ourBuffer = data;
//       bitMapr.transformBuf('greyscale', ourBuffer, (err, data) => {
//         bitMapr.writeBmp(data, (err,fName) => {
//           fs.readFile(fName, function(err, testData) {
//             if(err) throw err;
//             fs.readFile('./testResultGrey.bmp', function(err, goodData) {
//               if(err) throw err;
//               assert.deepEqual(testData, goodData);
//               done();
//             });
//           });
//         });
//       });
      
//     });
//   })
// });