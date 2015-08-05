
module.exports = {
  exposeApp: function* (next) {
    yield this.render('../tmp/index');
  },
  exposeIndex: function* (next) {
    yield this.render('index');
  }
};
