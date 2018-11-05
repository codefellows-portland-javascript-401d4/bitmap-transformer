const assert = require('assert');
const chai = require('chai');
const chaiAssert = require('chai').assert;
chai.use(require('chai-fs'));
const bmpFunctions = require('../index');

describe('Buffer', () => {
     it('returned buffer', done => {
        bmpFunctions.transformBitmap('non-palette-bitmap.bmp', (err, buffer) => {
            if (err) return done(err);
            assert(buffer instanceof Buffer);
            done();
        });
     });

    it('read header for offset info', done => {
        bmpFunctions.transformBitmap('non-palette-bitmap.bmp', (err, buffer) => {
            if (err) return done(err);
            let offset = bmpFunctions.readHeader(buffer);
            assert.equal(offset, 54);
            done();
        });
    });

    it('transformed bitmap properly', done => {
        bmpFunctions.transformBitmap('non-palette-bitmap.bmp', (err, buffer) => {
            if (err) return done(err);
            let offset = bmpFunctions.readHeader(buffer);
            let originalBuffer = bmpFunctions.createBuffer(buffer);
            let alteredBuffer = bmpFunctions.alterBitmapPixels(offset, buffer);
            for(let i = offset + 1; i < alteredBuffer.length; i++) {
                alteredBuffer[i] = 255 - alteredBuffer[i];
            }
            assert.deepEqual(alteredBuffer, originalBuffer);
            done();
        });
    });

    it('wrote file', done => {
        bmpFunctions.transformBitmap('non-palette-bitmap.bmp', (err, buffer) => {
            if (err) return done(err);
            let offset = bmpFunctions.readHeader(buffer);
            let alteredBitmap = bmpFunctions.alterBitmapPixels(offset, buffer);
            bmpFunctions.writeNewBitmap(alteredBitmap, (err) => {
                if (err) return done(err);
            });
            chaiAssert.isFile('modifiedBMP.bmp');
            done();
        }); 
    });    
});