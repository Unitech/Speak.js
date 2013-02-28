

var speak = require('../');

speak({msg : 'options may also include a start option to allow writing data at some position past the beginning of the file. Modifying a file rather than replacing it may require a flags mode of r+ rather than the default mode w',
       out : 'hello.mp3'}, function(){
	   console.log('finished');
       });
