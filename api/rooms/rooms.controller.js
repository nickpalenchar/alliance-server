'use strict';
var mongoose = require('mongoose');
var Rooms = mongoose.model('Room');
var Players = mongoose.model('Player');
var _ = require('lodash');
var Promise = require('bluebird');
var chalk = require('chalk');
var events = require('events');
var eventEmitter = new events.EventEmitter();


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
// @user: the _id of the user making the request. Will assign to admin if a new room is created!
// gets all rooms of the same id (from ip address) for user to join. Or creates the first one.
// !! returns an ARRAY if the rooms are old, otherwise an OBJECT if it created a new one.
module.exports.findOrCreate = function(req, res){

  let theStatus;

  Rooms.find({ id: req.params.id })
    .then(result => {
      console.log("[rooms.controller] the result: ", result);
      if(result.length && result.some(room => !room.active)) {
        console.log(chalk.green("RETURNING JUST RESULT"));
        theStatus = 200;
        return result
      }
      else {
        theStatus = 201;
        return Rooms.create({
          id: req.params.id,
          admin: req.body.user,
        })
      }
    })
    .then(rooms => {
      res.status(theStatus).send(rooms);
    });
};

///// POST: /api/rooms/

module.exports.createRoom = function(req, res){
  Rooms.create({
    id: req.body.id,
    admin: req.body.user
  })
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

      if(doc.room.options.maxPlayers === doc.room.players.length) throw new Error("Room Full");

      if(!doc.room.players.every(player => {
        console.log(player._id.toString(), doc.player._id.toString());
        return player._id.toString() !== doc.player._id.toString();
        })) return doc.room;

      doc.room.players.push(doc.player);
      if(!doc.room.admin) {
        doc.room.admin = doc.player;
        doc.room.markModified('admin');
      }
      doc.room.markModified('players');
      return doc.room.save();
    })
    .then(updatedRoom => res.status(200).send(updatedRoom))
    .catch(err => res.status(err.errorCode || 500).send(err));
};

////// POST api/rooms/options/:id
/// update the options. Body shold be key of the options to update
// note: options sent as stringified json so that bools are not converted into strings.
module.exports.updateOptions = function (req, res) {
  let options = JSON.parse(req.body.options);
  return Rooms.findOne({_id: req.params.id})
    .then(room => {
      console.log("THE NEW OPTIOS", options);
      room.options = Object.assign({},room.options, options);
      room.markModified("options");
      return room.save();
    })
    .then(room => res.status(200).send(room))
    .catch(err => res.status(err.statusCode || 500).send(err));
};

///// DELETE: /api/rooms/player/:id
/// :id: the mongoose _id of the PLAYER
/// @roomId: the mongoose _id of the ROOM
module.exports.deletePlayerFromRoom = function (req, res) {
  return Promise.props({
    player: Players.findOne({_id: req.params.id }),
    room: Rooms.findOne({_id: req.body.roomId })
  })
    .then(doc => {
      doc.room.players = _.filter(doc.room.players, item => item._id.toString() !== doc.player._id.toString() );
      doc.room.markModified('players');

      if(doc.room.admin._id.toString() === doc.player._id.toString()) {
        console.log("REEMOVING ADMIN");
        doc.room.admin = null;
        if(doc.room.players.length) doc.room.admin = doc.room.players[0];
        doc.room.markModified('admin');
      }

      return doc.room.save();
    })
    .then(updatedRoom => res.status(200).send(updatedRoom))
    .catch(err => {
      console.log(chalk.red(err));
      res.status(err.errorCode || 500).send(err)
    });
};
