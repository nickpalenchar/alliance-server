var Rooms = require('mongoose').model('Room')

/// URL: /api/rooms/find/:id
// gets all rooms of the same id (from ip address) for user to join. Or creates the first one.
module.exports.findOrCreate = function(req, res){

  Rooms.find({ id: req.params.id })
    .then(result => {
      if(result) {

      }
    });

  console.log("hellooooo youve hit this route!!!", req.ip);
  res.status(200).send(req.ip);
}