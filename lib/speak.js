//
//    _____                  __       _     
//   / ___/____  ___  ____ _/ /__    (_)____
//   \__ \/ __ \/ _ \/ __ `/ //_/   / / ___/
//  ___/ / /_/ /  __/ /_/ / ,< _   / (__  ) 
// /____/ .___/\___/\__,_/_/|_(_)_/ /____/  
//     /_/                     /___/        
//
// by Strzelewicz Alexandre
// Tue 14 Aug 2012 05:16:49 PM CEST
//

var request = require('request');
var fs = require('fs');

Speak = module.exports = function(opts, cb) {
    var data = {
	prot_vers: 2,
	jsoncallback : '',
	cl_login: "EXAMPLE_ID",
	cl_app: "EXAMPLE_APP",
	cl_pwd: "x0hzls5cqs",
	req_voice:"heather22k",
	req_text: opts.msg
    };
    
    request({
	method : 'GET',
	uri : "http://vaas.acapela-group.com/webservices/1-32-01-JSON/synthesizer.php",
	qs : data
    }, function(err, res, body) {
	var sound_url = JSON.parse(body.replace('(', '').replace(')', '')).snd_url;
	var output = fs.createWriteStream(opts.out);
	
	request(sound_url).pipe(output);

	output.on('close', function() {
	    return cb();
	});
    });
}

