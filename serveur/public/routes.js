var generateRoutes;
var actions = require('./actions');

module.exports = generateRoutes = function(app, prefix, router) {
  if (prefix === null) {
    prefix = '';
  }
  router.get(prefix + '/', actions.exposeIndex);
  router.get(prefix + '/login', actions.loginPage);
  router.post(prefix + '/login', actions.login);
};
