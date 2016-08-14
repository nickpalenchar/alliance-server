'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PlayerSchema = new Schema({
  name: { type: String, required: true },
  id: {type: String, required: true }
});

mongoose.model('Player', PlayerSchema);