const read = require('./lib/read.js');
const stream = require('stream');

function callBack() {
  console.log('callback of readWrite run');
};

read.readWrite('./non-palette-bitmap.bmp', callBack);
