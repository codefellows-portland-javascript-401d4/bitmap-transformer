const fs = require ('fs');
const stream = require('stream');
var read = {};

read.readWrite = function(filePath, cb) {
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;

        // buffer from data read
        read.buf = Buffer.from(data);
        read.bufSize = (read.buf).length;

        // new buffer with original buffer copied to it
        read.newBuf = Buffer.alloc(read.bufSize);
        (read.buf).copy(read.newBuf);

        // read image body offset from start point
        read.imgOffset = (read.newBuf).readInt32LE(10);

        // image header
        read.header = (read.buf).readIntLE(0,2).toString(16);

        // bits per pixel
        read.bitsPerPixel = data.readInt16LE(28);

        // image size from header
        read.imageSize = (read.newBuf).readInt32LE(2);

        // color inversion
        for(let i = read.imgOffset; i < read.bufSize; i++) {
            read.newBuf[i] = 255 - read.newBuf[i];
        }

        // inverted value for byte 15000
        read.byte15kInverted = read.newBuf[15000];
        fs.writeFile('./inverted.bmp', read.newBuf, cb);
    });
};

module.exports = read;
