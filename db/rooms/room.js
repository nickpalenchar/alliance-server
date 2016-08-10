var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RoomSchema = new Schema({
  id: String,
  name: String,
});

RoomSchema.methods.delete = function () {
  return this.remove();
};

mongoose.model('Room', RoomSchema);