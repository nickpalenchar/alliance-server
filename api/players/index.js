'use strict';

var players = require('express').Router();

var controller = require('./players.controller');
var devAuth = require('../../helpers/devAuth');


players.get('/', devAuth, controller.getAll);

players.get('/local/:id', controller.getLocal);

players.post('/', controller.newUser);

players.post('/delete', controller.deleteUser);

// Morgana
players.post('/remove/guest/:id', controller.deleteGuest);

// MORGANA BUILD: players not yet signed to a room is a guest of the building


module.exports = players;
