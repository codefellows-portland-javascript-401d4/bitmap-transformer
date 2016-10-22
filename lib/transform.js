const writeBMP = require('./writeBMP');

function invert(bitmapObj, cb) {
  // Check for palette map, transform either the palette or the buffer body
  const transformationName = 'inverted';
  if (bitmapObj.bitsPerPixel === 24) {        // non-palette, change the body
    var startBit = bitmapObj.startingAddress;
    var endBit = bitmapObj.size;
    var jump = 3;
  } else if (bitmapObj.bitsPerPixel === 8) {  // palette, change the palate table
    startBit = bitmapObj.paletteStart;
    endBit = bitmapObj.paletteStart + bitmapObj.paletteLength;
    jump = 4;
  } else {
    let err = 'That\'s not a bitmap bits-per-pixel I can process. Please try a different file.'
    cb(err);
  }
  console.log('Inverting colors...');
  for (let i = startBit; i < endBit - jump; i += jump) {
    bitmapObj.bytes[i] = 255 - bitmapObj.bytes[i];
    bitmapObj.bytes[i + 1] = 255 - bitmapObj.bytes[i + 1];
    bitmapObj.bytes[i + 2] = 255 - bitmapObj.bytes[i + 2];
  }
  writeBMP(bitmapObj, transformationName, cb);
}


module.exports = invert;