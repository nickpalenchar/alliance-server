'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var generateName = require('../../helpers/words');

var RoomSchema = new Schema({
  id: String,
  name: String,
  players: [],
  active: { type: Boolean, default: false },
  admin: Object,
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