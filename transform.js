const fs = require('fs');
// const path = require('path');

function invertColors(dir, cb){
    fs.readFile(dir, (err, buffer) => {
        if (err) return cb(err);
        //console.log("Done reading bitmap");
        startPoint = buffer.readInt32BE(11);
        //console.log('buffer size ', buffer.length);
        for (let i = startPoint; i <= buffer.length; i++) {
            //console.log('current buffer ', i);
            buffer[i] = (255 +(buffer[i]*-1));
            if (i === buffer.length) {
                fs.writeFile('fubarred.bmp', buffer, (err) => {
                    if (err) return cb(err);
                    cb();
                });
            };  
        };
        // console.log('__dirname: ' +  __dirname)
        // fs.writeFile('/' + __dirname + '/../test/' + 'fubarred.bmp', buffer);
        //console.log('fs.writeFile called from transform.js');
    });
};
// invertColors('../non-palette-bitmap.bmp');
module.exports = invertColors;


// it('makes buffer from string', done => {
//     const buffer = Buffer.from('the quick brown fox', 'ascii');
//     console.log(buffer);
// )};
