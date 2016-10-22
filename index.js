const fs = require('fs');
const path = require('path');
const buf = require('buffer');
const Bmp = require('./lib/readBMP');




bmpFile = process.argv[process.argv.length - 1];
bmpPath = path.join(bmpFile);

Bmp.readBMP(bmpPath, cb);


function cb(err) {
  console.log('you got an error: ', err);
}