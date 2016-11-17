const fs = require('fs');

function transformBitmap(bmp, cb) {
  fs.readFile(bmp, (err, buffer) => {
    cb(err, buffer);
  });  
}

function readHeader(buffer) {
    let offset = buffer.readInt8(10, 4);
    return offset;
}

function createBuffer(buffer) {
  let newBuffer = Buffer.from(buffer);
  return newBuffer;
}

function alterBitmapPixels(offset, buffer) {
  let bufferToBeAltered = createBuffer(buffer);
  for(let i = 0; i < bufferToBeAltered.length; i++) {
    if(i > offset) {
      bufferToBeAltered[i] = 255 - bufferToBeAltered[i];
    }
  }
  return bufferToBeAltered;
}

function writeNewBitmap(buffer, cb) {
  fs.writeFile('modifiedBMP.bmp', buffer, (err) => {
    cb(err);
  });
}

module.exports = {transformBitmap, readHeader, createBuffer, alterBitmapPixels, writeNewBitmap};