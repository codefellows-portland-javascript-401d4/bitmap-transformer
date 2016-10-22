
const Bmp = require('./readBMP');


function transform(bitmapObj, cb) {

  if (bitmapObj.bitsPerPixel === 24) {    // non-palette, change the body
    var startBit = bitmapObj.startingAddress;
    var endBit = bitmapObj.size;
  } else if (bitmapObj.bitsPerPixel === 8) {  // palette, change the palate table
    startBit = bitmapObj.paletteStart;
    endBit = bitmapObj.paletteStart + bitmapObj.paletteLength;
  } else {
    cb('That\'s not a bpp I can process. Please try a different file.');
    return;
  }

  for (var i = startBit; i < endBit; i++) {}



}


module.exports = transform;