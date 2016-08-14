var server = require('express')();
var http = require('http').Server(server);
var chalk = require('chalk');
var bodyParser = require('body-parser');

var FRONTEND_ORIGIN = require('./env').FRONTEND_ORIGIN;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/', function (req, res, next) {

  // server logging //
  console.log("--- NEW REQUEST ---");
  console.log(chalk.bold(chalk.yellow(req.method)) + chalk.magenta(" " + req.path))
  console.log(chalk.bold(chalk.gray("BODY: ")) + (JSON.stringify(req.body)));

  /// global custom headers ///
  res.setHeader('Access-Control-Allow-Origin', FRONTEND_ORIGIN);

  next();
});

server.use('/api', require('./api'));

module.exports = server;