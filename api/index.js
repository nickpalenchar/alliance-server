var router = require('express').Router();

router.get('/',function (req, res) {
  console.log("got re");
  req.status(201).send();
});

router.use('/rooms', require('./rooms'));

module.exports = router;