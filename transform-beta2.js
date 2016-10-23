var fs = require('fs');

function imageInfo(imagePath, callback) {
    fs.readFile(imagePath, (err, buffer) => {
        if (err) return callback(err);
        else {
            for (var i = 0; i < 30; i++) {
                console.log(i,' ', buffer.readInt16BE(i));  
            };
        };
    });
};

imageInfo('./non-palette-bitmap.bmp');
imageInfo('./palette-bitmap.bmp');

module.exports = {
    info: imageInfo
};