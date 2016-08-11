var startDb = require('./db');
var chalk = require('chalk');

var server = require('http').createServer();

var createApplication = function () {
  var app = require('./server');
  server.on('request', app); // Attach the Express application.
};

var startServer = function () {

  var PORT = process.env.PORT || 3001;

  server.listen(PORT, function () {
    console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
  });

};

startDb.then(createApplication).then(startServer).catch(function (err) {
  console.error(chalk.red(err.stack));
  process.kill(1);
});