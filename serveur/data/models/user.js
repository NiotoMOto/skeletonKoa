mongoose = require('mongoose');

module.exports = mongoose.model('user',{
    name: String
});