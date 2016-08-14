'use strict';

let Player = require('mongoose').model('Player');

//// GET api/players/
// *** Requires Auth **, gets all playres

module.exports.getAll = function(req, res) {
  Player.find({})
    .then(players => res.status(200).send(players))
    .catch(err => res.status(500).send(err));
};

///// GET api/players/local/:id
/// gets all players from the local room id. For validating on the front end if names are unique.
module.exports.getLocal = function (req, res) {
  Player.find({id: req.params.id})
    .then(players => res.status(200).send(players))
    .catch(err => res.status(500).send(err));
};

///// POST api/players ////
// @name: name of the player
// @id: id (from ipaddress)

module.exports.newUser = function(req, res) {
  let id = req.body.id;
  let name = req.body.name;
  Player.find({id, name})
    .then(result => {
      if (!result.length)
        return Player.create({ name, id});
      else throw new Error("duplicate");
    })
    .then(createdPlayer => res.status(201).send(createdPlayer))
    .catch(err => res.status(400).send("Error: user with same name and id exists"));
}