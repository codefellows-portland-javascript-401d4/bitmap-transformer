# Bitmap-transformer
Bitmap-transformer creates new inverted image from the image it is provided. It is compatable with palette and non-palette bitmaps. 

## Usage example case:
Index.js contains a simple usage case. In this case the test image is transformed into 'fubarred-non-palette-bitmap.bmp'. 

```Javascript
var transform = require('./transform');

transform('./non-palette-bitmap.bmp'); // Target image is selected
```

## Testing
package.json, transform.test.js, and .travis.yml files are present. Mocha with chia testing is availible with the developer enviroment. _Testing is not possible without the included test input and proof images_.

### Specifing new name and pathway
The destination and output file name are specified ./lib/transformed.js. The default prepends 'fubarred-' to the input file name and creates the new file in the same directory as the input. These values are specified in the module and will need to be changed in there. 

line 7 specifies the output name and path.
```Javascript
    var newName = 'fubarred-' + pathArray[(pathArray.length - 1)];
```

### Authors:
The module was a team project written by Chris B., Albert R., and Michelle S. It would have not been possible without the intructors and TA's from Code Fellows, et al.

Check out our githubs:

*[Chris B. - QuantumArchive](https://github.com/QuantumArchive)*

*[Albert R - Waxhoya](https://github.com/Waxhoya)*

*[Michelle S. - MichelleSri](https://github.com/michellesri)*