var express = require('express');
var app = express();
app.use('/src', express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/example'));

module.exports = app;
