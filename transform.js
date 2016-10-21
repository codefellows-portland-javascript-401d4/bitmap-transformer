const fs = require('fs');

function invertColors(dir, cb){
    fs.readFile(dir, (err, buffer) => {
        if (err) return cb(err);
        startPoint = buffer.readInt32BE(11);
        for (let i = startPoint; i <= buffer.length; i++) {
            buffer[i] = (255 +(buffer[i]*-1));
            if (i === buffer.length) {
                fs.writeFile('fubarred.bmp', buffer, (err) => {
                    if (err) return cb(err);
                    cb();
                });
            };  
        };
    });
};

module.exports = invertColors;
