var generateActions, generateApi, generateRoutes;
var views = require('koa-views');

generateRoutes = require('./routes');
generateActions = require('./actions');

module.exports =  function(app, prefix, router) {
  var actions = {};
  if (prefix === null) {
    prefix = '';
  }
  generateRoutes(app, prefix, router);
};
