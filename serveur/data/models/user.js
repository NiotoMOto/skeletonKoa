var mongoose = require('mongoose'),
    spend = require('./spend'),
    colocation = require('./colocation');

var Schema = mongoose.Schema;

var schema = new Schema({
    name: String
});

schema.pre('remove', (next) => {
  spend.remove({creator: this._id}, (err, data) => {
    next();
  });
});

module.exports = mongoose.model('user', schema);
