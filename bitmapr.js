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

bitMapr.transformBuf = function(data, callback) {
  let imageOffset = data.readIntLE(10, 4);
  for (let a = imageOffset; a < data.length; a++){
    // console.log(data.readUInt8(a));
    let colorVal = (255 - data.readUInt8(a));
    data.writeUInt8(colorVal, a);    
  };
  callback(null, data);
}

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