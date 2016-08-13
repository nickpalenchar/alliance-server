'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PlayerSchema = new Schema({
  name: String,
  id: String,
});

mongoose.model('Player', PlayerSchema);