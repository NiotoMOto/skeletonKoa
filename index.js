var koa = require('koa');
var generateApi = require('./serveur/api/');
var data = require('./serveur/data/');
var _ = require('lodash');
var router = require('koa-router')();
var bodyParser = require('koa-body-parser');
var bootstrapDev = require('./serveur/data/dev/');

var app = koa();
app.use(bodyParser());

// Routes
_.each(mongoose.models, (m, key) => {
  generateApi(app, m, '/api', router);
});
app.use(router.routes());

// populate database
bootstrapDev().then(() => {
  // Start server
  app.listen(3000, () => {
    console.log('serveur start on port 3000 ...');
  });
});
