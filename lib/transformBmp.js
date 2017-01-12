const require = ('fs');

function Color(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
}

function Palette(colorIndex) {
    this.colorIndex = colorIndex;
}

function Nonpalette(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b;
}

function Bitmap(filename, cb) {
    let context = this;

    fs.readFile(filename, (err, data) => {
        if (err) return cb(err);
        context.buffer = data;
        context.bmpHeader = {

        }
    })
}

module.exports = Bitmap;