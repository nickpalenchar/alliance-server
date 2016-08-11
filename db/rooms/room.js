var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var generateName = require('../../helpers/words');

var RoomSchema = new Schema({
  id: String,
  name: String,
});

RoomSchema.methods.delete = function () {
  return this.remove();
};

RoomSchema.pre('save', function (next) {
  if(this.name) return next();
  let _n;
  let tryName = (function (n) {
    let name = generateName(n||"");
    this.constructor.find({id: this.id, name: name})
      .then(result => {
        if(result && result.length) return tryName((n||0) + 1);

      })
  }).bind(this);

});
mongoose.model('Room', RoomSchema);