var fs = require('fs');

function invertImage(imagePath, callback) {
    var startPoint;
    var endPoint;
    var pathArray = imagePath.split('/');
    var newName = 'fubarred-' + pathArray[(pathArray.length - 1)];
    fs.readFile(imagePath, (err, buffer) => {
        if (err) return callback(err);
        //this logic will assume header format is the Windows BITMAPINFOHEADER
        if (buffer.readInt16LE(28) <= 8) {
            console.log('I have a palette');
            endPoint = buffer.readInt32LE(10);
            startPoint = buffer.readInt32LE(14) + 14 + 1;
            for (let i = startPoint; i < endPoint; i++) {
                buffer[i] = (255 - (buffer[i]));
                if (i === (endPoint - 1)) {
                    fs.writeFile(newName, buffer, (errTwo) => {
                        if (errTwo) return callback(errTwo);
                        callback();
                    });
                };
            };
        } else {
            console.log('I don\'t have a palette!');
            //where you can start editing pixels
            startPoint = buffer.readInt32LE(10);
            for (let i = startPoint; i <= buffer.length; i++) {
                buffer[i] = (255 - (buffer[i]));
                if (i === buffer.length) {
                    fs.writeFile(newName, buffer, (errTwo) => {
                        if (errTwo) return callback(errTwo);
                        callback();
                    });
                };
            };
        };
    });
};

// invertImage('./non-palette-bitmap.bmp', null);
// invertImage('./palette-bitmap.bmp', null);

module.exports = invertImage;