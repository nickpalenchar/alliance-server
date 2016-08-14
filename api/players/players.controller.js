'use strict';

let Player = require('mongoose').model('Player');

//// GET api/players/
// *** Requires Auth **, gets all playres

module.exports.getAll = function(req, res) {
  Player.find({})
    .then(players => res.status(200).send(players))
    .catch(err => res.status(500).send(err));
}