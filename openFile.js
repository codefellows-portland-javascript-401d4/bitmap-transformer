var fs = require('fs');
fs.readFile('./non-palette-bitmap.bmp', function(err, buffer){
  if (err) throw err;
  var buffer = buffer;
  const buf = Buffer.from(buffer);
  var imageOffset = buf.readIntLE(10, 4);
  
  console.log(buf.readIntLE(28, 4));
  console.log('size', buf.readIntLE(2, 4));
  console.log(imageOffset);
  console.log(buf.readInt8(63));
  console.log(buf.readInt8(64));
  console.log(buf.readInt8(65));
  console.log('length property',buf.length);
});
//   fs.writeFile('./bytes.txt', buffer, function(err){
//     if (err) throw err;
//     console.log('saved');
//   })
// });
