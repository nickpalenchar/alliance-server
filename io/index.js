'use strict';
var socketio = require('socket.io');
var io = null;
var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on("test", function(){
  console.log("TEST WORKED");
});

module.exports = function (server) {

  if (io) return io;

  io = socketio(server);

  io.emit("hello");

  io.on('connection', function () {
    console.log("connecteddddd");

    io.emit("test");

    io.on('disconnect',function () {
      console.log("discennected");
    })
  });

  module.exports.instance = io;

  return io;

};
