const fs = require('fs');
const stream = require('stream');
var transform = {};
// const read = require('./lib/read.js');

transform.transformFile= function(cb){
  // for(let i = 4; i < bufSize; i+=4){
  //   if(i > imgOffset) {
  //     newBuf[i] = newBuf[i] + 50;
  //     // newBuf[i] = newBuf[i-50];
  //   }
  // }
  console.log('In transform file');
  cb();
};

module.exports = transform;
