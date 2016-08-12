var Promise = require('bluebird');
var chalk = require('chalk');

var DATABASE_URI = require('../env').DATABASE_URI;
console.log(">>>> the uri ", DATABASE_URI)
var mongoose = require('mongoose');

var db = mongoose.connect(DATABASE_URI).connection;

mongoose.Promise = Promise;

require('./rooms/room');

var startDbPromise = new Promise(function (resolve, reject) {
  db.on('open', function () {
    resolve(db);
  });
  db.on('error', reject);
});

console.log(chalk.yellow("Opening connection to db..."));
startDbPromise.then(function () {
  console.log(chalk.green("db connection opened!"));
});

module.exports = startDbPromise;
