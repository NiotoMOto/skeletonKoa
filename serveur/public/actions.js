var sendFile = require('koa-sendfile');
var mongoose = require('mongoose');
var _ = require('lodash');

module.exports = {
  exposeIndex: function* (next) {
    yield this.render('index.dust');
  },
  login: function* (next) {
    yield this.render('login.dust');
  }
};
