'use strict';

var DAY = require('../../helpers/time.values').DAY;

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var generateName = require('../../helpers/words');

var optionsObject = {
  specialCharacters: true,
  merlin: true,
  percival: true,
  assassin: true,
  mordred: true,
  morgana: true,
  oberon: true,
  maxPlayers: 10,
};

var RoomSchema = new Schema({
  id: String,
  name: String,
  players: [],
  active: { type: Boolean, default: false },
  info: Object,
  admin: Object,
  options: {type: Object, default: optionsObject },
  creationDate: {type: Date, default: Date.now }
});



RoomSchema.methods.delete = function () {
  return this.remove();
};

RoomSchema.pre('save', function (next) {
  if(this.name) return next();

  console.log("DOC ", this.id);
  this.constructor.find({id: this.id})
    .then(rooms => {
      console.log("THE ROOMS; ", rooms);
      this.name = generateName(rooms);
      next()
    })
    .catch(next);

});
mongoose.model('Room', RoomSchema);