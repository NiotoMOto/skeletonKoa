var generateActions, generateApi, generateRoutes;

generateRoutes = require('./routes');
generateActions = require('./actions');

module.exports =  function(app, model, prefix) {
  var actions;
  if (prefix === null) {
    prefix = '';
  }
  actions = generateActions(model);
  console.log(model.modelName);
  generateRoutes(app, model.modelName, actions, prefix);
};
