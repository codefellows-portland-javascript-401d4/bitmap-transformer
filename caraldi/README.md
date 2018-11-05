# Bitmap Transformer Lab Assignment

Completed as part of Code Fellows 401 course

## Bitmap reader and transformer 
+ Reads a bitmap file in from disk, runs one or more color and transforms on the bitmap and then write it out to a new file. 
+ Requires use of node `Buffer` in order to manipulate binary data 

### General process outline:

1. Opens file using fs and reads it into a buffer
2. Reads the "header" information to get the needed info 
3. Runs a transform on the buffer based on the header information and transform being applied
4. Writes the buffer to a new file

The wikipedia article found here [Bitmap Specification](https://en.wikipedia.org/wiki/BMP_file_format) 
describes the byte specification of a "windows bitmap file."
