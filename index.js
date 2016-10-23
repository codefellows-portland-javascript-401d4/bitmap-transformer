const read = require('./lib/read.js');
const transform = require('./lib/transform.js');
const write = require('./lib/write.js');
const stream = require('stream');

function callBack() {
  console.log('callback of readWrite run');
};

read.readWrite('./non-palette-bitmap.bmp', callBack);
