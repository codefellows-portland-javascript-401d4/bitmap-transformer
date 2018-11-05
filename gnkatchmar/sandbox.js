// this file used for constructing final app

// //palette-bitmap.bmp


// var fs = require('fs');

// // function createNewBuffer (buffer, callback){

// //   fs.readFile(buffer, function (err, buffer ) {
// //     console.log(buffer);
// //     var newBuffer = Buffer.from(buffer);
// //     console.log(newBuffer);
// //     callback(err, newBuffer);
// //   });
// // }

// // function createFileHeaderInfo (newBuffer, callback) {

// //   //if bitsPerPixel = 24, it is non-palette
// //   const startPalette = newBuffer.readInt32LE(10);
// //   console.log(startPalette);  // 54 for non-palette; 1078 for palette
// //   const bitsPerPixel = newBuffer.readInt16LE(28);
// //   console.log(bitsPerPixel); // 24 for non-palette; 8 for palette


// //   callback(null, startPalette);
  
// // }

// // createNewBuffer('data/non-palette-bitmap.bmp', function(err, newBuffer) {
// //   createFileHeaderInfo(newBuffer, function() {

// //   });
// // });

// function transformNPBMP (buffer, callback) {

//   fs.readFile(buffer, function (err, buffer ) {
//     console.log(buffer);
//     const bitsPerPixel = buffer.readInt16LE(28);
//     console.log(bitsPerPixel); // 24 means non-palette bmp; other values means palette bmp
//     const startPalette = buffer.readInt32LE(10);
//     console.log(startPalette);  // 54 for non-palette bmp
//     for (var i = startPalette; i < buffer.length; i++) {
//       buffer[i] = 255 - buffer[i];
//     }
//     var newBuffer = Buffer.from(buffer);
//     console.log(newBuffer);
//     fs.writeFile('data/transformed.bmp', newBuffer, function(err) {
//       if(err) { 
//          return console.log(err);
//        }
//       console.log('file saved');
//     });
//     callback(err, newBuffer);
//   });

// }

// transformNPBMP('data/non-palette-bitmap.bmp', function (){console.log('transformNP ended');});