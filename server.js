var server = require('express')();
var http = require('http').Server(server);
var chalk = require('chalk');
var mongoose = require('mongoose');

var FRONTEND_ORIGIN = require('./env').FRONTEND_ORIGIN;

server.use('/', function (req, res, next) {

  // server logging //
  console.log("--- NEW REQUEST ---");
  console.log(chalk.bold(chalk.yellow(req.method)) + chalk.magenta(" " + req.path))

  /// global custom headers ///
  res.setHeader('Access-Control-Allow-Origin', FRONTEND_ORIGIN);

  next();
});

server.use('/api', require('./api'));

module.exports = server;