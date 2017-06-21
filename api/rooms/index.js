'use strict';

var rooms = require('express').Router();

var controller = require('./rooms.controller');
var devAuth = require('../../helpers/devAuth');

rooms.get('/', devAuth, controller.getAll);

rooms.get('/find/:id', controller.findOrCreate);

rooms.get('/one/:id', controller.getOne);

rooms.post('/', controller.createRoom);

rooms.post('/player/:id', controller.addPlayerToRoom);

rooms.post('/player/:id/delete', controller.deletePlayerFromRoom);

rooms.post('/options/:id', controller.updateOptions);

// Morgana update - get guest room.
rooms.get('/waiting/:id', controller.findOrCreateWaiting);

module.exports = rooms;
