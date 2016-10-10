'use strict';

var players = require('express').Router();

var controller = require('./players.controller');
var devAuth = require('../../helpers/devAuth');


players.get('/', devAuth, controller.getAll);

players.get('/local/:id', controller.getLocal);

players.post('/', controller.newUser);

players.post('/delete', controller.deleteUser);

module.exports = players;
