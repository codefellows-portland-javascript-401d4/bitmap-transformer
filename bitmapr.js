var fs = require('fs');

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



module.exports = bitMapr;