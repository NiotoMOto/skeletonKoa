'use strict';

var koa = require('koa');
var views = require('koa-views');
var bodyParser = require('koa-body-parser');
var staticCache = require('koa-static-cache');
var router = require('koa-router')();
var _ = require('lodash');
var mongoose = require('mongoose');
var path = require('path');

var data = require('./serveur/data/');
var dataDev = require('./serveur/data/dev/');
var generateApi = require('./serveur/api/');
var generateAppRoutes = require('./serveur/app/');


var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = koa();
app.use(bodyParser());
app.use(staticCache(path.join(__dirname, 'public'), {prefix: '/public'}));
var appFiles = {};

if(env === 'development'){
  app.use(staticCache(path.join(__dirname, 'tmp'), {prefix: '/app'}, appFiles));
  app.use(staticCache(path.join(__dirname, 'app/bower_components'), {prefix: '/app/bower_components'}, appFiles));
  app.indexFile = '../tmp/index';
}else if(env === 'production'){
  app.use(staticCache(path.join(__dirname, 'app'), {prefix: '/dist'}, appFiles));
  app.indexFile = '../dist/index';
}

app.use(views('views', {default: 'dust'}));

// Routes
_.each(mongoose.models, (m, key) => {
  generateApi(app, m, '/api', router);
});
generateAppRoutes(app, null, router);

app.use(router.routes());

function start(){
  // populate database
  dataDev.populate().then(() => {
    // Start server
    app.listen(3000, () => {
      console.log('Server start on port 3000 ....');
    });
  });
}

exports.app = app;
exports.start = start;
