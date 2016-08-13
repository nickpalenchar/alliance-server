'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var generateName = require('../../helpers/words');

var RoomSchema = new Schema({
  id: String,
  name: String,
  players: [],
});

RoomSchema.methods.delete = function () {
  return this.remove();
};

RoomSchema.pre('save', function (next) {
  if(this.name) return next();

  let tryName = (function (n) {
    let name = generateName(n||"");
    return this.constructor.find({id: this.id, name: name})
      .then(result => {
        if(result && result.length) return tryName((n||0) + 1).call(this);
        return name;
      })
  }).bind(this);

  tryName()
    .then(name => {
      this.name = name;
      next();
    })
    .catch(next);

});
mongoose.model('Room', RoomSchema);