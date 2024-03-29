var generateActions, generateApi, generateRoutes;

generateRoutes = require('./routes');
generateActions = require('./actions');

module.exports =  function(app, model, prefix, router) {
  var actions = {};
  if (prefix === null) {
    prefix = '';
  }
  actions = generateActions(model);
  generateRoutes(app, model.modelName, actions, prefix, router);
};
