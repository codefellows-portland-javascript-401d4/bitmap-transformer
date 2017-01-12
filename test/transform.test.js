const fs = require ('fs');
const rimraf = require('rimraf');
const assert = require('assert');
const read = require ('../lib/transform');

describe('bitmap color transformer', function() {
    beforeEach(function(done) {
        rimraf('./inverted.bmp', done);
    });

    after(function(done) {
        rimraf('./inverted.bmp');
    });
    
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
                var originalByte = data[15000];
                var invertedByte = 255 - originalByte;

                assert.deepEqual(invertedByte, read.originalByteInverted);
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
