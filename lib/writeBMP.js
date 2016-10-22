const fs = require('fs');

function writeBMP(bitmap, transformationName, cb) {
  console.log('i reached the write function');
  // Take object, create new file name, save to file
  var filename = transformationName + '-' + bitmap.filename;
  fs.writeFile(filename, bitmap, function(err) {
    if (err) {
      console.log('A file write error occurred.');
      cb(err);
    } else {
      console.log('New ' + transformationName + ' bitmap created.');
    }
  });
}

module.exports = writeBMP;