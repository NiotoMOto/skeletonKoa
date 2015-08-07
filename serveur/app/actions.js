var sendFile = require('koa-sendfile');
module.exports = {
  exposeApp: function* (next) {
    console.log(__dirname);
    yield sendFile.call(this, './tmp/index.html');
  },
  exposeIndex: function* (next) {
    yield this.render('index.dust');
  }
};
