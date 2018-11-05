var fs = require('fs');
const mkdirp = require('mkdirp');

var bitMapr = {};

bitMapr.readBmp = function(path, callback) {
  fs.readFile(path, function(err, data) {
    if (err) throw err;
    var buf = Buffer.from(data);
    callback(null, buf);
  });
};

bitMapr.transformBuf = function(type, data, callback) {
  let imageOffset = data.readIntLE(10, 4);
  if (type === 'invert') {
    for (let a = imageOffset; a < data.length; a++){
      let colorVal = (255 - data.readUInt8(a));
      data.writeUInt8(colorVal, a);    
    };
  } else {
    for (let a = imageOffset; a < data.length; a+=3) {
      let colorVal = Math.floor((data.readUInt8(a) + data.readUInt8(a+1) + data.readUInt8(a+2)) / 3);
      data.writeUInt8(colorVal, a);
      data.writeUInt8(colorVal, a + 1);
      data.writeUInt8(colorVal, a + 2);
    };
  };
  callback(null, data);
};

bitMapr.writeBmp = function(data, callback) {
  mkdirp('./newImages/', function (err) {
    if (err) throw err;
    fs.writeFile('./newImages/newBmp.bmp', data, (err) => {
      if (err) throw err;
      callback(null, './newImages/newBmp.bmp');
    });
  });
}

module.exports = bitMapr;