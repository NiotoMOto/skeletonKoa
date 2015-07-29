'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports =
  mongoose.model('spend',{
    montant: Number,
    colocation: {type: Schema.Types.ObjectId, ref: 'colocation'},
    creator: {type: Schema.Types.ObjectId, ref: 'user'},
    toUser: {type: Schema.Types.ObjectId, ref: 'user'}
});
