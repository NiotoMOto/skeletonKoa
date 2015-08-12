'use strict';

const koa = require('koa');
const views = require('koa-views');
const bodyParser = require('koa-body-parser');
const staticCache = require('koa-static-cache');
const Router = require('koa-router');
const _ = require('lodash');
const mongoose = require('mongoose');
const path = require('path');
const noCache = require('koa-no-cache');
const cors = require('koa-cors');
const session = require('koa-generic-session');
const passport = require('passport');

const data = require('./serveur/data/');
const dataDev = require('./serveur/data/dev/');
const generateApi = require('./serveur/api/');
const generateAppRoutes = require('./serveur/app/');


const env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

const app = koa();
app.use(bodyParser());
app.use(cors());
app.keys = ['sessionSecret'];
// app.use(session());
// app.proxy = true;
app.use(staticCache(path.join(__dirname, 'public'), {prefix: '/public'}));
const appFiles = {};

//static routes
if(env === 'development'){
  app.use(noCache({
    global: true
  }));
  app.use(staticCache(path.join(__dirname, 'tmp'), {prefix: '/app'}, appFiles));
  app.use(staticCache(path.join(__dirname, 'app/bower_components'), {prefix: '/app/bower_components'}, appFiles));
  app.indexFile = './app/tmp/index';
}else if(env === 'production'){
  app.use(staticCache(path.join(__dirname, 'app'), {prefix: '/dist'}, appFiles));
  app.indexFile = './app/dist/index';
}

app.use(views('views', {default: 'dust'}));

// Routes
const securedRoutes = new Router();
const publicRoutes = new Router();

_.each(mongoose.models, (m, key) => {
  generateApi(app, m, '/api', securedRoutes);
});
generateAppRoutes(app, null, publicRoutes);

app.use(securedRoutes.routes());
app.use(publicRoutes.routes());

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
