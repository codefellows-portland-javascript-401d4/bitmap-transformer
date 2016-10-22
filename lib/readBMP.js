/** Created by Gloria Anholt on 10/20/16. **/

/** NOTES
 PALETTE-BITMAP
 <Buffer 42 4d 46 2b 00 00 00 00 00 00 36 04 00 00 28 00 00 00 64 00 00 00 64 00 00 00 01 00 08 00 00 00 00 00 10 27 00 00 12 0b 00 00 12 0b 00 00 00 01 00 00 ... >
 Hex 42 = Decimal 66 = 'B' in ascii
 Hex 4d = Decimal 77 = 'M' in ascii
 When printed as the buffer, node displays hexidecimal
 When asked for buffer[0], node displays the decimal value
 Windows BM Header is *probably* 40 bytes long
 Starting offset buffer[10] = 1078
 Vits per pixel: 8 -- 1 byte

 NON-PALETTE-BITMAP
 <Buffer 42 4d 66 75 00 00 00 00 00 00 36 00 00 00 28 00 00 00 64 00 00 00 64 00 00 00 01 00 18 00 00 00 00 00 30 75 00 00 12 0b 00 00 12 0b 00 00 00 00 00 00 ... >
 Hex 42 = Decimal 66 = 'B' in ascii
 Hex 4d = Decimal 77 = 'M' in ascii
 Bits per pixel set at buffer[28] = 24 (24 bit image)
 Starting offset buffer[10] = 54
 Bits per pixel: 24 -- 3 bytes each
 Byte length: 30054
 **/


const fs = require('fs');
const buf = require('buffer');
const transform = require('./transform.js');


function Bmp(abuffer) {
  // takes the file read in elsewhere and builds an object out of it
  this.bmpType = abuffer.readInt16LE(0); // because it's 2 bytes of data
  this.size = abuffer.readInt32LE(2);  // 4 bytes of data
  this.startingAddress = abuffer.readInt32LE(10);
  this.headerSize = abuffer.readInt32LE(14);
  this.paletteStart = this.headerSize + 14;   // bitmapcoreheader 14. each entry 4 bytes long
  this.paletteLength = 128;                   // length of palette
  this.widthPixels = abuffer.readInt32LE(18);
  this.heightPixels = abuffer.readInt32LE(22);
  this.bitsPerPixel = abuffer.readInt16LE(28);
  this.compression = abuffer.readInt32LE(30);

}

Bmp.readBMP = function(filename, cb) {

  console.log('read file received ', filename);
  fs.readFile(filename, function(err, bufferdata) {
    // this reads the file in as a buffer of hex pairs (1 byte)
    if (err) {    // if you get an error, pass it to the callback to handle
      console.log('you got a read error: ', err);
      cb(err);
    } else {    // make a new bitmap, fill it with data, pass next function
      var bitmap = new Bmp(bufferdata);
      bitmap.bytes = bufferdata.slice();
      // pass this off to be modified
      transform(bitmap, cb);
    }
  });
};



Bmp.transform = function(bitmap, cb) {
  // bitmap headers say their starting point at offset 10
  // you can get their length as data.byteLength
  for (var i = bitmap.startingAddress; i< bitmap.size; i+=3) {
    console.log('b:', bitmap.bytes.readInt8(i), ' g:', bitmap.bytes.readInt8(i+1), ' r:', bitmap.bytes.readInt8(i+2));
  }
  callback();
};


function callback(response) {
 // console.log('callback passed: ', response);
}


module.exports = Bmp;