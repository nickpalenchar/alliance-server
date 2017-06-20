'use strict';
let chalk = require('chalk');
let Player = require('mongoose').model('Player');
let _ = require('lodash');
//// GET api/players/
// *** Requires Auth **, gets all playres

module.exports.getAll = function(req, res) {
  Player.find({})
    .then(players => res.status(200).send(players))
    .catch(err => res.status(500).send(err));
};

///// GET api/players/local/:id
/// gets all players from the local room id. For validating on the front end if names are unique.
///@TODO: DEPRECATED. Delete 30 days after Morgana release
module.exports.getLocal = function (req, res) {
  console.log(chalk.red("[players.controller] DEPRECATION NOTICE - use /api/rooms/guest/:id instead"))
  console.log(chalk.red("[players.controller]") + " getting players in bldg#" + req.params.id);
  Player.find({id: req.params.id})
    .then(players => res.status(200).send(players.map(player => _.pick(player, ['name', 'id']))))
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
};

///// DELETE api/players/delete
// @name
// @code
module.exports.deleteUser = function (req, res) {
  console.log(chalk.red("delete request ") + chalk.blue(req.body));
  return Player.remove({name: req.body.name, code: req.body.code})
    .then(result => res.status(200).send(result));
};
