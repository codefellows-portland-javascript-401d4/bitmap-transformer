const fs = require('fs');
const stream = require('stream');
var read = {};

read.readWrite = function(filePath, cb){ 
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    //create buffer from read data 
    var buf = Buffer.from(data);
    const bufSize = buf.length;
    console.log('buffer size', bufSize);

    //define new buffer and copy orig buffer to it
    const newBuf = Buffer.alloc(bufSize);
    buf.copy(newBuf);

    //get image body offset from specific place in file
    const imgOffset = newBuf.readInt32LE(10);
    console.log('imgOffset', imgOffset);

    // get image header
    read.header = buf.readIntLE(0,2).toString(16);
    console.log('header ', buf.readIntLE(0,2).toString(16));

    //get bits per pixel
    const bitsPerPixel = data.readInt16LE(28);
    console.log('bits per pixel:', bitsPerPixel);

    //get image size from header
    const size = newBuf.readInt32LE(2);
    console.log('Image Size:', size);

    // for(let i = 2; i < bufSize; i+=3){
    //   if(i > imgOffset) {
    //     newBuf[i] = newBuf[i] + 70;
    //   }
    // }

    //invert the colors
    for(let i = imgOffset; i <bufSize; i++) {
      newBuf[i] = 255 - newBuf[i];
    }
    fs.writeFile('./inverted.bmp', newBuf, cb);  
  });

};




module.exports = read;

