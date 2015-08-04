var generateRoutes,
    pluralize = require('pluralize');

module.exports = generateRoutes = function(app, modelName, actions, prefix, router) {
  if (prefix === null) {
    prefix = '';
  }
  modelName = pluralize(modelName);

  router.get(prefix + ('/' + modelName), actions.findAll);
  router.get(prefix + ('/' + modelName + '/:id'), actions.findById);
  router.post(prefix + ('/' + modelName), actions.create);
  router.post(prefix + ('/' + modelName + '/:id'), actions.updateById);
  router.del(prefix + ('/' + modelName + '/:id'), actions.deleteById);
  router.del(prefix + ('/' + modelName), actions.deleteAll);
  router.put(prefix + ('/' + modelName), actions.create);
  router.put(prefix + ('/' + modelName + '/:id'), actions.replaceById);
  router.patch(prefix + ('/' + modelName + '/:id'), actions.updateById);
};
