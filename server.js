const fs = require('fs');


 
var test = function(){
    fs.readFile('palette-bitmap.bmp', (err, buffer) => {
        console.log("Done reading bitmap");
        startPoint = buffer.readInt32BE(11);
        for (let i = startPoint; i < buffer.length; i++) {
            console.log(buffer[i]);
            buffer[i] = (255 +(buffer[i]*-1));  
        };
        fs.writeFile('fubarred.bmp', buffer);
    });
};



test();

// it('makes buffer from string', done => {
//     const buffer = Buffer.from('the quick brown fox', 'ascii');
//     console.log(buffer);
// )};
