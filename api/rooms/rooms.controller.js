'use strict';

var Rooms = require('mongoose').model('Room');


/// GET /api/rooms/find
// returns all rooms
module.exports.getAll = function (req, res) {
  Rooms.find({})
    .then(rooms => res.status(200).send(rooms));
}


/// GET: /api/rooms/find/:id
// gets all rooms of the same id (from ip address) for user to join. Or creates the first one.
module.exports.findOrCreate = function(req, res){

  let theStatus;
  console.log("HELO");

  Rooms.find({ id: req.params.id })
    .then(result => {
      console.log("[rooms.controller] the result: ", result);
      if(result.length) {
        theStatus = 200;
        return result
      }
      else {
        theStatus = 201;
        return Rooms.create({
          id: req.params.id
        })
      }
    })
    .then(rooms => {
      res.status(theStatus).send(rooms);
    });
};