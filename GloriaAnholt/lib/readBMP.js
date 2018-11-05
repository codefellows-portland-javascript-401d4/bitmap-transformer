/** Created by Gloria Anholt on 10/20/16. **/

/** NOTES
 <Buffer 42 4d 46 2b 00 00 00 00 00 00 36 04 00 00 28 00 00 00 64 00 00 00 64 00 00 00 01 00 08 00 00 00 00 00 10 27 00 00 12 0b 00 00 12 0b 00 00 00 01 00 00 ... >
 When printed as the buffer, node displays hexidecimal
 When asked for buffer[0], node displays the decimal value

 PALETTE-BITMAP
 Windows BM Header is 40 bytes long
 Starting offset buffer[10] = 1078
 Bits per pixel buffer[28]: 8 -- 1 byte BGRA in color header

 NON-PALETTE-BITMAP
 Starting offset buffer[10] = 54
 Bits per pixel buffer[28]: 24 bit image -- 3 bytes each (BGR)
 Byte length: 30054
 **/

const fs = require('fs');
const flags = require('../index');
const transform = require('./transform.js');


function Bmp(bmpBuffer, filename) {
  // takes the buffer data and builds an object out of it
  this.bmpType = bmpBuffer.readInt16LE(0);    // 16 because 2 bytes of data
  this.size = bmpBuffer.readInt32LE(2);       // 32 because 4 bytes of data
  this.startingAddress = bmpBuffer.readInt32LE(10);
  this.headerSize = bmpBuffer.readInt32LE(14);
  this.paletteStart = this.headerSize + 14;   // bitmapcoreheader 14
  this.paletteLength = 128;                   // length of palette, each entry 4 bytes long
  this.widthPixels = bmpBuffer.readInt32LE(18);
  this.heightPixels = bmpBuffer.readInt32LE(22);
  this.bitsPerPixel = bmpBuffer.readInt16LE(28);
  this.compression = bmpBuffer.readInt32LE(30);
  this.filename = filename;
}

function readBMP(filename, cb) {
  // Read in file as a buffer of hex, make an object with the headers,
  // copy buffer data, pass to transformer
  console.log('Reading file: ', filename);
  fs.readFile(filename, function(err, bufferdata) {
    if (err) {    // if you get an error, pass it to the callback to handle
      console.log('Error reading file: ', filename);
      cb(err);
    } else {    // make a new bitmap, fill it with data, pass next function
      var bitmap = new Bmp(bufferdata, filename);
      bitmap.bytes = bufferdata.slice();
      // pass this off to be modified
      if (flags.invert) {
        transform.invert(bitmap, cb);
      } else if (flags.grayscale) {
        transform.grayscale(bitmap, cb);
      } else {
        let err = 'Invalid transformation. Please try again.';
        cb(err);
      }
    }
  });
}

function displayPixels(bitmap) {
  // draw out the BGR values for the bitmap
  for (var i = bitmap.startingAddress; i< bitmap.size; i+=3) {
    console.log('b:', bitmap.bytes.readInt8(i), ' g:', bitmap.bytes.readInt8(i+1), ' r:', bitmap.bytes.readInt8(i+2));
  }
}

module.exports = readBMP;
//module.exports.displayPixels = displayPixels;
