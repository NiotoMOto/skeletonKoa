var koa = require('koa');
var generateApi = require('./serveur/api/');
var data = require('./serveur/data/');
var _ = require('lodash');
var router = require('koa-router')();

console.log(router);
var app = koa();
_.each(mongoose.models, (m, key) => {
  generateApi(app, m, '/api');
});

app.listen(3000);
