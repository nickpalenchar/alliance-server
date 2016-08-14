'use strict';

var rooms = require('express').Router();

var controller = require('./rooms.controller');
var devAuth = require('../../helpers/devAuth');

rooms.get('/', devAuth, controller.getAll);

rooms.get('/find/:id', controller.findOrCreate);

rooms.post('/', controller.createRoom)

module.exports = rooms;