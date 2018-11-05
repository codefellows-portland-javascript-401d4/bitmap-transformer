const writeBMP = require('./writeBMP');


function checkBPP(bitmapObj, cb) {
  // Check for palette map, transform either the palette or the buffer body
  if (bitmapObj.bitsPerPixel === 24) {        // non-palette, change the body
    var startByte = bitmapObj.startingAddress;
    var endByte = bitmapObj.size;
    var jump = 3;
  } else if (bitmapObj.bitsPerPixel === 8) {  // palette, change the palate table
    startByte = bitmapObj.paletteStart;
    endByte = bitmapObj.paletteStart + bitmapObj.paletteLength;
    jump = 4;
  } else {
    let err = 'That\'s not a bitmap bits-per-pixel I can process. Please try a different file.'
    cb(err);
  }
  return [startByte, endByte, jump];
}

function invert(bitmapObj, cb) {
  // Invert the values of the colors, return the results to be saved
  const transformationName = 'inverted';
  [startByte, endByte, jump] = checkBPP(bitmapObj);
  console.log('Inverting colors...');
  for (let i = startByte; i <= endByte - jump; i += jump) {
    bitmapObj.bytes[i] = 255 - bitmapObj.bytes[i];
    bitmapObj.bytes[i + 1] = 255 - bitmapObj.bytes[i + 1];
    bitmapObj.bytes[i + 2] = 255 - bitmapObj.bytes[i + 2];
  }
  writeBMP(bitmapObj, transformationName, cb);
}

function grayscale(bitmapObj, cb) {
  // Desaturate image based on intensity, return the results to be saved
  console.log('Desaturating colors...');
  const transformationName = 'grayscale';
  [startByte, endByte, jump] = checkBPP(bitmapObj);
  const alpha = 1; //desaturation amount
  for (let i = startByte; i <= endByte - jump; i += jump) {
    // set up all our variables
    var blue = bitmapObj.bytes[i] / 255;
    var green = bitmapObj.bytes[i + 1] / 255;
    var red = bitmapObj.bytes[i + 2] / 255;
    var intensity = (blue * 0.114) + (green * 0.587) + (red * 0.299);
    // redefine colors with grayscale formula
    bitmapObj.bytes[i] = Math.floor((blue + alpha * (intensity - blue)) * 255);
    bitmapObj.bytes[i + 1] = Math.floor((green + alpha * (intensity - green)) * 255);
    bitmapObj.bytes[i + 2] = Math.floor((red + alpha * (intensity - red)) * 255);
  }
  writeBMP(bitmapObj, transformationName, cb);
}

exports.invert = invert;
exports.grayscale = grayscale;