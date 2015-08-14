var mongoose = require('mongoose'),
    spend = require('./spend'),
    colocation = require('./colocation'),
    uniqueValidator = require('mongoose-unique-validator'),
    bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, unique: true, require: true},
    password: { type: String, required: true, bcrypt: true },
});

schema.pre('remove', (next) => {
  spend.remove({creator: this._id}, (err, data) => {
    next();
  });
});

schema.pre('save', (next) => {
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password);
  }
  next();
});


schema.methods.verifyPassword = function(password, cb){
  cb(bcrypt.compareSync(password, this.password));
};



schema.plugin(uniqueValidator);

module.exports = mongoose.model('user', schema);
