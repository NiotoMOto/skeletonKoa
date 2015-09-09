var sendFile = require('koa-sendfile');
var mongoose = require('mongoose');
var _ = require('lodash');

module.exports = {
  exposeIndex: function* (next) {
    yield this.render('index.dust');
  },
  loginPage: function* (next) {
    yield this.render('login.dust');
  },
  login: function* (next) {
    yield next;
    try {
      const ursername = this.request.body.username;
      const password = this.request.body.username;
      const modelUser  = mongoose.models.user;
      var user = yield modelUser.findOne({name : ursername}).exec();
      console.log(user);
      const authentifiate = yield user.verifyPassword(password);
      console.log(authentifiate);
    }catch(err){
      console.log(err);
      this.body = err;
      return this.body;
    }
  }
};
