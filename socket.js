var chalk = require('chalk');

module.exports = function (io) {
  console.log(chalk.yellow("--NEW SOCKET CONNECTION"));
  io.on('disconnect', function() {
    console.log(chalk.red("*socket* user disconnected"));
  })
};