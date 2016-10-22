const fs = require('fs');
const stream = require('stream');
const write = {};
// const read = require('./lib/read.js');

write.writeFile = function(cb){
  // fs.writeFile('./fubarred.bmp', newBuf);
  console.log('In the write file');
  cb();
};



module.exports = write;
