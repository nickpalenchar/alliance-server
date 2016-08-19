'use strict';
var socketio = require('socket.io');
var io = null;
var events = require('events');
var chalk = require('chalk');
var eventEmitter = new events.EventEmitter();

eventEmitter.on("test", function(){
  console.log("TEST WORKED");
});

module.exports = function (server) {

  if (io) return io;

  io = socketio(server);

  io.on('connection', function (io) {
    console.log("connecteddddd");

    io.on('join-room', function (room) {
      console.log(chalk.yellow("request to join room " + room));
      if(typeof room !== 'string') {
        console.log('need to join a room by string. returnin');
        return;
      }
      io.join(room);
      io.emit('test', 'standard test');
      io.to("nonexistantroom").emit("err", "you should not have gotten this");
      console.log("THE ROOML?", io.room);
    });

    io.on('send-test', function () {
      console.log("test reciewen");
      io.emit('test', 'this is a test');
    })
    io.on('test-room', function(room){
      console.log("test recieved??? in room??", room);
      io.in(room).emit('message', 'this went to room ' + room);
    })

    //// all sockets should have the roomId as the first arg so that it will only be broadcasted to that room
    //// rooms _id used for each room.

    io.on("update-players", function (room, players) {
      io.in(room).emit("update-players", players);
    });

    io.on("remove-player", function (room, player) {
      console.log("teste workeddd")
    });

    io.on('disconnect',function () {
      console.log("discennected");
    })
  });

  io.on("me", function () {
    console.log("OUTSIDE");
  })

  return io;

};
