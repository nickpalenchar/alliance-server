var server = require('express')();
var http = require('http').Server(server);
var mongoose = require('mongoose');

server.use('/api', require('./api'));

http.listen(3001, function () {
  console.log("Server is definitely not evil on port 3001");
});