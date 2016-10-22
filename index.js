const fs = require('fs');
const path = require('path');
const cmd = require('commander');
const readBMP = require('./lib/readBMP');


cmd.version('1.0.0')
  .usage('[options] <bmp file ...>')
  .option('-i, --invert', 'Invert the colors in a bitmap')
  .option('-g, --grayscale', 'Desaturate the bitmap into grayscale (based on intensity)')
  .parse(process.argv);

var bmpFile = process.argv[process.argv.length - 1];
var bmpPath = path.join(bmpFile);

readBMP(bmpPath, errorHandler);


function errorHandler(err) {
  console.error('Error: ', err);
}

exports.invert = cmd.invert;
exports.grayscale = cmd.grayscale;
