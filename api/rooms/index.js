var rooms = require('express').Router();

var controller = require('./rooms.controller');

rooms.get('/find/:id', controller.findOrCreate);

module.exports = rooms;