var fs = require('fs');
const mkdirp = require('mkdirp');

var bitMapr = {};

//Read the bitmap and store it to the buffer
bitMapr.readBmp = function(path, callback) {
  fs.readFile(path, function(err, data) {
    if (err) throw err;
    callback(null, Buffer.from(data));
  });
};

//transforming the bitmap
bitMapr.transformBuf = function(type, data, callback) {
  //grabs the beginning of the bits that start the pixels
  let imageOffset = data.readIntLE(10, 4);
  //function to invert the colors
  if (type === 'invert') {
    for (let a = imageOffset; a < data.length; a++){
      let colorVal = (255 - data.readUInt8(a));
      data.writeUInt8(colorVal, a);    
    };
  } else {
    //function to grayscale the bitmap
    for (let a = imageOffset; a < data.length; a+=3) {
      let colorVal = Math.floor((data.readUInt8(a) + data.readUInt8(a+1) + data.readUInt8(a+2)) / 3);
      data.writeUInt8(colorVal, a);
      data.writeUInt8(colorVal, a + 1);
      data.writeUInt8(colorVal, a + 2);
    };
  };
  callback(null, data);
};

//make new bitmap into new image
bitMapr.writeBmp = function(data, callback) {
  mkdirp('./newImages/', function (err) {
    if (err) throw err;
    fs.writeFile('./newImages/newBmp.bmp', data, (err) => {
      if (err) throw err;
      callback(null, './newImages/newBmp.bmp');
    });
  });
};

module.exports = bitMapr;