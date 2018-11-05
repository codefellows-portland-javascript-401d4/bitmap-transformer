This module is a bitmap transformer: given an image and a color transformation,
it will return a new bitmap image.

* Written in JavaScript (ES5) with some ES6 features, using Node v6+
* Linted with eslint and tested using Mocha

To Use
* Pass the module a bitmap file name and the desired transformation and it will
return a new bitmap, saved into a bmp folder created at the project root. All new
bitmaps will be stored as original_file_name-transformed.bmp