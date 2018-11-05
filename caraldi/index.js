const transformer = require('./lib/transform.js');
const stream = require('stream');

function cb() {
    console.log('Callback for readWrite');
};

read.readWrite('./non-palette-bitmap.bmp', cb);
