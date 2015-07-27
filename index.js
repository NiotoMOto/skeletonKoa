var koa = require('koa');
var generateApi = require('./serveur/api/');
var data = require('./serveur/data/');
var _ = require('lodash');
var router = require('koa-router')();
var bodyParser = require('koa-body-parser');

var app = koa();
app.use(bodyParser());
_.each(mongoose.models, (m, key) => {
  generateApi(app, m, '/api', router);
});
app.use(router.routes());

app.listen(3000);
