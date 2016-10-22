const read = require('./lib/read.js');
const transform = require('./lib/transform.js');
const write = require('./lib/write.js');
const stream = require('stream');

function callTransform() {
  console.log('transform called');
  transform.transformFile(callWrite);
};
function callWrite() {
  console.log('write called');
  write.writeFile(allDone);
};
function allDone() {
  console.log('All Done');

}



// read.readFile();
