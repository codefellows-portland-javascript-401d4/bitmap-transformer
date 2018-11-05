Bitmap Transformer Assignment <br/>
Collaborators: Michael Freeman, Nathan Keene, Niilo Smeds, Thomas Shultz <br/>
<br/>
1.) For this assignment, we coded a buffer.js file to enable the user to introduce any bitmap file and perform a color transformation on the bitmap through manipulation of the binary data within the buffer. The transformed bitmap would then be written out to a new file. For our transformation, we chose to alter the image by changing all of the pixel values over to their opposite values by subtracting each original pixel value from 255, and then applying the difference to every pixel value. <br/>
<br/>
2.) Our buffer.js file takes a bmp-formatted file and applies functions as follows: <br/>
(a.) transformBitmap ... retrieves binary data from the buffer. <br/>
(b.) readHeader ... reads data within the header at byte positions 10 thru 14 to determine the offset value for start of the bmp image data. <br/>
(c.) changePixels ... changes the pixel values of the binary data, beginning with the next byte position after the offset value, by iterating through the bmp image data, subtracting each pixel value from 255, and then applying the difference to every pixel value. The transformed data is then returned as the new buffer data set. <br/>
(d.) createNewBitmap ... finally, the transformed data is then written into a new bitmap file entitled 'modifiedBMP.bmp' <br/>
