const assert = require('assert');
const importedFunc = require('../index');

describe('Buffer', () => {
     it('returned buffer', done => {
        importedFunc.transformBitmap('non-palette-bitmap.bmp', (err, buffer) => {
            if (err) return done(err);
            assert(buffer instanceof Buffer);
            done();
        });
     });

    it('read header for offset info', done => {
        importedFunc.transformBitmap('non-palette-bitmap.bmp', (err, buffer) => {
            if (err) return done(err);
            let offset = importedFunc.readHeader(buffer);
            assert.equal(offset, 54);
            done();
        });
    });

    it('transformed bitmap', done => {
        importedFunc.transformBitmap('non-palette-bitmap.bmp', (err, buffer) => {
            if (err) return done(err);
            let offset = importedFunc.readHeader(buffer);
            let bufSlice = Buffer.from(buffer);
            let transformed = importedFunc.changePixels(offset, buffer);
            let transformSlice = Buffer.from(transformed);
            for(let i = offset + 1; i < transformSlice.length; i++) {
                transformSlice[i] = 255 - transformSlice[i];
            }
            assert.deepEqual(transformSlice, bufSlice);
            done();
        });
    });

    it('wrote file', done => {
        importedFunc.transformBitmap('non-palette-bitmap.bmp', (err, buffer) => {
            if (err) return done(err);
            let offset = importedFunc.readHeader(buffer);
            let transformed = importedFunc.changePixels(offset, buffer);
            importedFunc.createNewBitmap(transformed, (err) => {
                if (err) return done(err);
            });
            done();
        }); 
    });    
});