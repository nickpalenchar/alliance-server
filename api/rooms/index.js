'use strict';

var rooms = require('express').Router();

var controller = require('./rooms.controller');
var devAuth = require('../../helpers/devAuth');

rooms.get('/',  controller.getAll);

rooms.get('/find/:id', devAuth, controller.findOrCreate);

module.exports = rooms;