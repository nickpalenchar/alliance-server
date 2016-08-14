var DEV = require('../env/index').DEV_ROUTE;

module.exports = function (req, res, next) {
  if(DEV) next();
  else {
    throw res.status(403).send("This route is only available in development");
  }
}