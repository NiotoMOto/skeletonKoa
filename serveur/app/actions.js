var sendFile = require('koa-sendfile');
module.exports = {
  exposeApp: function* (next) {
    yield sendFile.call(this, './tmp/index.html');
    if (!this.status) this.throw(404);
  },
  exposeIndex: function* (next) {
    yield this.render('index.dust');
  }
};
