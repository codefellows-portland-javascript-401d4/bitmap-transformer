var assert = require('chai').assert;
var fs = require('fs');
var transform = require('../lib/transform');
var rimraf = require('rimraf');

var imageArray = ['./fubarred-non-palette-bitmap.bmp', './fubarred-palette-bitmap.bmp']; 

describe('transform', done => {
    before(done => {
        fs.access(imageArray[0], (err) => {
            rimraf(imageArray[0], (errTwo) => {
                if (errTwo) done(errTwo);
                else fs.access(imageArray[1], (errThree) => {
                    rimraf(imageArray[1], (errFour) => {
                        if (errFour) done(errFour);
                        done();
                    });
                });
            });
        });
    });
    
    it('makes sure console logging works :)', done => {
        console.log('console logging to make sure rimraf is working');
        done();
    });

    it('runs the invertColors function on the non-pallete.bmp', done => {
        transform('./non-palette-bitmap.bmp', done);
    });

    it('runs the invertColors function on the non-pallette.bmp', done => {
        transform('./palette-bitmap.bmp', done);
    });

    it('tests whether the newly created inverted file for non-palette matches with proven inverted file', done => {
        fs.readFile('./fubarred-non-palette-bitmap-proof.bmp', (err, buffer) => {
            if(err) done(err);
            fs.readFile(imageArray[0], (err, bufferTwo) => {
                if(err) done(err);
                for(var i = 0; i <= buffer.length; i++){
                    assert.equal(buffer[i], bufferTwo[i]);
                };
                done();
            });
        });
    });

    it('tests whether the newly created invert file for the palette matches with proven invert file', done => {
        fs.readFile('./fubarred-palette-bitmap-proof.bmp', (err, buffer) => {
            if(err) done(err);
            fs.readFile(imageArray[1], (err, bufferTwo) => {
                if(err) done(err);
                for(var i = 0; i <= buffer.readInt32LE(10); i++){
                    assert.equal(buffer[i], bufferTwo[i]);
                };
                done();
            });
        });
    });
});