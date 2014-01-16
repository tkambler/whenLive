var port = process.argv[2];
var express = require('express');
var server = express(); // better instead
server.configure(function(){
	server.use('/', express.static(__dirname + '/src'));
	server.use(express.static(__dirname + '/example'));
});

server.listen(port);
