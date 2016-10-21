const fs = require('fs');

const read = {};

read.readWrite = function() {
  fs.readFile('./palette-bitmap.bmp', (err, buffer) => {
    console.log(buffer);

  });

};


module.exports = read;

