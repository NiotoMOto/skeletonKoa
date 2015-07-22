var koa = require('koa');
var app = koa();
var generateApi = require('./serveur/api/');
var data = require('./serveur/data/');
var _ = require('lodash');

_.each(mongoose.models, (m, key) => {
  generateApi(app, m, '/api');
});

app.listen(3000);
