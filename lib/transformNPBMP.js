var fs = require("fs");
//next two separated for file-naming purposes
var prefix = "data/";
var filename = "transnon-palette-bitmap.bmp";

function transformNPBMP (buffer, callback) {

	fs.readFile(buffer, function (err, buffer ) {
    // var bitsPerPixel = buffer.readInt16LE(28); // 24 verifies non-palette bmp; other values are for paletted .bmps
		var startPalette = buffer.readInt32LE(10); // 54 for non-palette .bmp
    //the above two values would be needed for this app to handle both kinds of .bmps
		for (var i = startPalette; i < buffer.length; i++) {
			buffer[i] = 255 - buffer[i];
		}
		var newBuffer = Buffer.from(buffer);
		fs.writeFile(prefix + "trans" + filename, newBuffer, function(err) {
			if(err) { 
				return (err);
			}
		});
		callback(err, newBuffer);
	});

}

module.exports = transformNPBMP;