'use strict';

var mongoose = require('mongoose'),
    spend = require('./spend'),
    colocation = require('./colocation'),
    uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, unique: true, require: true}
});

schema.pre('remove', (next) => {
  spend.remove({creator: this._id}, (err, data) => {
    next();
  });
});

schema.plugin(uniqueValidator);


module.exports = mongoose.model('user', schema);
