'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let _ = require('lodash');

let generateCode = require('../../helpers/hash');

let PlayerSchema = new Schema({
  name: { type: String, required: true },
  id: {type: String, required: true },
  code: { "type": String, "default": generateCode }
});

PlayerSchema.methods.clean = function () {
  return _.omit(this, ["code"]);
};

mongoose.model('Player', PlayerSchema);