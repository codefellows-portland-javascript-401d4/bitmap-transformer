const fs = require('fs');


 
function invertColors(str){
    fs.readFile(str, (err, buffer) => {
        console.log("Done reading bitmap");
        startPoint = buffer.readInt32BE(11);
        for (let i = startPoint; i < buffer.length; i++) {
            console.log(buffer[i]);
            buffer[i] = (255 +(buffer[i]*-1));  
        };
        fs.writeFile('fubarred.bmp', buffer);
    });
};

module.exports = invertColors;


// it('makes buffer from string', done => {
//     const buffer = Buffer.from('the quick brown fox', 'ascii');
//     console.log(buffer);
// )};
