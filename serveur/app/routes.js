var generateRoutes;
var actions = require('./actions');

module.exports = generateRoutes = function(app, prefix, router) {
  if (prefix === null) {
    prefix = '';
  }
  router.get(prefix + '/', actions.exposeIndex);
  router.get(prefix + '/app', actions.exposeApp);
  router.get(prefix + '/models', actions.exposeModels);
};
