var sendFile = require('koa-sendfile');
var mongoose = require('mongoose');
var _ = require('lodash');

module.exports = {
  exposeApp: function* (next) {
    yield sendFile.call(this, './tmp/index.html');
    if (!this.status) this.throw(404);
  },
  exposeIndex: function* (next) {
    yield this.render('index.dust');
  },
  exposeModels: function* (next){
    yield next;
    this.body = _.map(mongoose.models,(m, key) => {
      return key;
    });
    return this.body;
  }
};
