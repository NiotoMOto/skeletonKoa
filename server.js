'use strict';

var koa = require('koa');
var generateApi = require('./serveur/api/');
var data = require('./serveur/data/');
var _ = require('lodash');
var router = require('koa-router')();
var bodyParser = require('koa-body-parser');
var dataDev = require('./serveur/data/dev/');
var mongoose = require('mongoose');
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

const app = koa();
app.use(bodyParser());

// Routes
_.each(mongoose.models, (m, key) => {
  generateApi(app, m, '/api', router);
});
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
