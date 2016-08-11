var server = require('express')();
var http = require('http').Server(server);
var mongoose = require('mongoose');

server.use('/api', require('./api'));

module.exports = server;