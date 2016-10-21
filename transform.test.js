var assert = require('chai').assert;
var fs = require('fs');
var transform = require('./transform');

describe('transform', done => {
    it('makes sure console logging works :)', () => {
        console.log('console logging is good');
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
                }
                done();
            })
        })
    });
});