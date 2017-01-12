const fs = require ('fs');
const assert = require('assert');
const read = require ('../lib/transform');

describe('bitmap color transformer', function() {
    
    it('adds new image for test', function(done) {
        function addImage() {
            assert.ok(fs.existsSync('./inverted.bmp'));
            done();
        }
        read.readWrite('./non-palette-bitmap.bmp', addImage);
    });

    it('inverts image colors', function(done) {
        function invertImage() {
            fs.readFile('./non-palette-bitmap.bmp', function(err, data) {
                if (err) throw err;
                var byte15k = data[15000];
                var invertedByte = 255 - byte15k;

                assert.deepEqual(invertedByte, read.byte15kInverted);
                done();
            });
        }
        read.readWrite('./non-palette-bitmap.bmp', invertImage);
    });

    it('reproduces pinned image', function(done) {
        function pinnedImage() {
            fs.readFile('./pinned-standard.bmp', function(err, data) {
                if (err) throw err;
                var pinnedImageBuf = Buffer.from(data);

                assert.deepEqual(pinnedImageBuf, read.newBuf);
                done();
            });
        }
        read.readWrite('./non-palette-bitmap.bmp', pinnedImage);
    });   
});
