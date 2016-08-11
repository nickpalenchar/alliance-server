var path = require('path');

var devConfig =  path.join(__dirname, './development.js'),
    prodConfig = path.join(__dirname, './production.js');

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./production');
} else {
  module.exports = require('./development');
}