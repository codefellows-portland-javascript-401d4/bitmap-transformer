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

function changePixels(offset, buffer) {
  for(let i = 0; i < buffer.length; i++){
      if(i > offset) {
        buffer[i] = 255 - buffer[i];
      }
  }
  return buffer;
}

function createNewBitmap(buffer, cb) {
  fs.writeFile('modifiedBMP.bmp', buffer, (err) => {
    cb(err);
  });
}

module.exports = {transformBitmap, readHeader, changePixels, createNewBitmap};