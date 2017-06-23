'use strict';
let socketio = require('socket.io');
let io = null;
let events = require('events');
let chalk = require('chalk');
let eventEmitter = new events.EventEmitter();
let assignRoles = require('./gameStart');

let mongoose = require('mongoose');
let Room = mongoose.model('Room');
let WaitingRoom = mongoose.model('WaitingRoom');
eventEmitter.on("test", function(){
  console.log("TEST WORKED");
});

module.exports = function (server) {

  if (io) return io;

  io = socketio(server);

  io.on('connection', function (socket) {

    socket.on('join-room', function (room) {
      console.log("request to join room ", room);
      if(typeof room !== 'string') {
        console.log('need to join a room by string. returnin');
        return;
      }
      socket.join(room);
      io.sockets.to(room).emit('test', "THIS IS THE ROOOM");
    });

    socket.on('send-test', function () {
      console.log("test reciewen");
      socket.emit('test', 'this is a test');
    });
    socket.on('test-room', function(room){
      console.log("test recieved??? in room??", room);
      io.sockets.in(room).emit('message', 'this went to room ' + room);
    });

    //// all sockets should have the roomId as the first arg so that it will only be broadcasted to that room
    //// rooms _id used for each room.

    socket.on("update-players", function (room, players) {
      console.log("got update players, emittin ", players);
      io.sockets.in(room).emit("update-players", players);
      io.sockets.in("ROOM_SELECTION").emit("update-players", room, players);
    });

    socket.on("remove-player", function (room, playerId) {
      console.log("triggered ", room, playerId);
      io.sockets.in(room).emit("remove-player", playerId);
    });

    socket.on("update-room", function (room, roomObj) {
      io.sockets.in(room).emit("update-room", roomObj);
      io.sockets.in("ROOM_SELECTION").emit("update-room", roomObj);
    });
    socket.on("new-room", function(roomObj){
      io.sockets.in("ROOM_SELECTION").emit("new-room", roomObj);
    });

    socket.on("start-game", function (room, options, players, roomId) {
      console.log("PLAYERS: ", players);
      var info = assignRoles(options, players);

      console.log("INFOOO?? ", info); // TODO IF PLAYER IDS ARE INCLUDED USE THIS

      io.sockets.in(room).emit("start-game", info);

      WaitingRoom.findOne({id: roomId})
        .then(waitingRoom => {
          console.log("THE PLAYERS ", players, "\nTHE WAITING ROOM ", waitingRoom, "\nTHE WAITING ROOM GUESTS ARRAY ", waitingRoom.guests);
          let playerIds = players.map(player => player.id);
          console.log("player idddss ", playerIds);
          waitingRoom.guests = waitingRoom.guests.filter(guest => {
            console.log("guestt in iteration ", guest);
            console.log("inclued the id? ", playerIds.includes(guest));
            !playerIds.includes(guest)
          });
          console.log("NEW WAITING ROOM GUESTS", waitingRoom);
          return waitingRoom.save();
        });

      Room.findOne({_id: room})
        .then(roomDoc => {
          roomDoc.active = true;
          roomDoc.info = info;
          return roomDoc.save();
        });
        //.then(() => WaitingRoom.findOne({id: room}))

    });

    socket.on('disconnect',function () {
      console.log("discennected");
    })
  });

  return io;

};
