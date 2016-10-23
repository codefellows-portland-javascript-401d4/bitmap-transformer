const fs = require('fs');
const stream = require('stream');
var read = {};

read.readWrite = function(filePath, cb){

  fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    //create buffer from read data 
    read.buf = Buffer.from(data);
    read.bufSize = (read.buf).length;
    console.log('buffer size', read.bufSize);

    //define new buffer and copy orig buffer to it
    read.newBuf = Buffer.alloc(read.bufSize);
    (read.buf).copy(read.newBuf);

    //get image body offset from specific place in file
    read.imgOffset = (read.newBuf).readInt32LE(10);
    console.log('imgOffset', read.imgOffset);

    // get image header
    read.header = (read.buf).readIntLE(0,2).toString(16);
    console.log('header ', read.header);

    //get bits per pixel
    read.bitsPerPixel = data.readInt16LE(28);
    console.log('bits per pixel:', read.bitsPerPixel);

    //get image size from header
    read.imageSize = (read.newBuf).readInt32LE(2);
    console.log('Image Size:', read.imageSize);

    //invert the colors
    for(let i = read.imgOffset; i <read.bufSize; i++) {
      read.newBuf[i] = 255 - read.newBuf[i];
    }

    //get inverted value of byte 15000
    read.byte15kInverted = read.newBuf[15000];
    // console.log('byte 15k inverted;', read.byte15kInverted);
    fs.writeFile('./inverted.bmp', read.newBuf, cb);  
  });

};

module.exports = read;

