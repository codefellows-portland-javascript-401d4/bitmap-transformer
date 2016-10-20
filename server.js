const fs = require('fs');



var test = function(){
    fs.readFile('non-palette-bitmap.bmp', (err, buffer) => {
        console.log("Done reading bitmap");
        for (let i = 0; i < buffer.length; i++) {
            console.log(buffer[i]);
            if(i > 1078) {
                buffer[i] = 7;
            };
        };
        fs.writeFile('fubarred.bmp', buffer);
    });
};

// it('makes buffer from string', done => {
//     const buffer = Buffer.from('the quick brown fox', 'ascii');
//     console.log(buffer);
// )};
