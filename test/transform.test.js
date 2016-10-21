var assert = require('chai').assert;
var fs = require('fs');
var transform = require('../transform');
var rimraf = require('rimraf');

describe('transform', done => {
    before(done => {
        fs.access('./fubarred.bmp', (err) => {
            rimraf('./fubarred.bmp', (errTwo) => {
                if (errTwo) done(errTwo);
                else done();
            });
        });
    });
    
    it('makes sure console logging works :)', done => {
        setTimeout(function() {
            console.log('console logging to make sure rimraf is working');
            done();
        }, 1000);
    });

    it('runs the invertColors function once', done => {
        transform('./non-palette-bitmap.bmp', done);
    });

    it('tests whether the newly created inverted file matches with proven inverted file', done => {
        fs.readFile('./fubarred-proof.bmp', (err, buffer) => {
            if(err) done(err);
            fs.readFile('./fubarred.bmp', (err, bufferTwo) => {
                if(err) done(err);
                for(var i = 0; i <= buffer.length; i++){
                    assert.equal(buffer[i], bufferTwo[i]);
                };
                done();
            });
        });
    });
});