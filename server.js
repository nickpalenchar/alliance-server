var server = require('express')();
var http = require('http').Server(server);
var io = require('socket.io')(http);
var chalk = require('chalk');
var bodyParser = require('body-parser');

var socketController = require('./socket');

var FRONTEND_ORIGIN = require('./env').FRONTEND_ORIGIN;
console.log('io???', io.on);
io.on('connection', function(io){
  console.log("new connectionnnn");
});


server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/', function (req, res, next) {

  // server logging //
  console.log("--- NEW REQUEST ---");
  console.log(chalk.bold(chalk.yellow(req.method)) + chalk.magenta(" " + req.path))
  console.log(chalk.bold(chalk.gray("BODY: ")) + (JSON.stringify(req.body)));

  /// global custom headers ///
  res.setHeader('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
  res.setHeader("Access-Control-Allow-Headers", "true");

  next();
});

server.use('/api', require('./api'));

module.exports = server;