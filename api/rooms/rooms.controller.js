'use strict';
var mongoose = require('mongoose');
var Rooms = mongoose.model('Room');
var Players = mongoose.model('Player');
var _ = require('lodash');
var Promise = require('bluebird');


/// GET /api/rooms/find
// returns all rooms
module.exports.getAll = function (req, res) {
  Rooms.find({})
    .then(rooms => res.status(200).send(rooms));
};


///// GET /api/rooms/one/:id
// gets a room of the MONGOOSE ID

module.exports.getOne = function(req, res ){
  Rooms.findOne({_id: req.params.id})
    .then(room => res.status(200).send(room))
    .catch(err => res.status(err.statusCode || 500).send(err))
};

/// GET: /api/rooms/find/:id
// gets all rooms of the same id (from ip address) for user to join. Or creates the first one.
// !! returns an ARRAY if the rooms are old, otherwise an OBJECT if it created a new one.
module.exports.findOrCreate = function(req, res){

  let theStatus;

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

///// POST: /api/rooms/

module.exports.createRoom = function(req, res){
  Rooms.create({id: req.body.id })
    .then(room => res.status(201).send(room))
    .catch(err => res.status(500).send(err));
};

///// POST: /api/rooms/player/:id
/// :id: the mongoose id of the PLAYER
/// @roomId: the _id of the ROOM

module.exports.addPlayerToRoom = function (req, res) {

  //// TODO: add socket.io for emmiting new players.

  return Promise.props({
    player: Players.findOne({_id: req.params.id }),
    room: Rooms.findOne({_id: req.body.roomId })
  })
    .then(doc => {
      doc.room.players.push(doc.player);
      doc.room.markModified('players');
      return doc.room.save();
    })
    .then(updatedRoom => res.status(200).send(updatedRoom))
    .catch(err => res.status(err.errorCode || 500).send(err));
};

///// DELETE: /api/rooms/player/:id
module.exports.deletePlayerFromRoom = function (req, res) {
  return Promise.props({
    player: Players.findOne({_id: req.body.playerId }),
    room: Rooms.findOne({_id: req.params.id })
  })
    .then(doc => {
      doc.room.players = _.remove(doc.room.players, item => (item._id === doc.player._id ));
      doc.room.markModified('players');
      return doc.room.save();
    })
    .then(updatedRoom => res.status(200).send(updatedRoom))
    .catch(err => res.status(err.errorCode || 500).send(err));
};