var generateRoutes,
    pluralize = require('pluralize'),
    bodyParser = require('koa-body-parser'),
    route = require('koa-route');

module.exports = generateRoutes = function(app, modelName, actions, prefix) {
  console.log(app);
  if (prefix === null) {
    prefix = '';
  }
  modelName = pluralize(modelName);

  console.log(modelName);

  app.use(bodyParser());

  app.use(route.get(prefix + ("/" + modelName), actions.findAll));
  app.use(route.get(prefix + ("/" + modelName + "/:id"), actions.findById));
  app.use(route.post(prefix + ("/" + modelName), actions.create));
  app.use(route.post(prefix + ("/" + modelName + "/:id"), actions.updateById));
  app.use(route.del(prefix + ("/" + modelName + "/:id"), actions.deleteById));
  app.use(route.put(prefix + ("/" + modelName), actions.create));
  app.use(route.put(prefix + ("/" + modelName + "/:id"), actions.replaceById));
  app.use(route.patch(prefix + ("/" + modelName + "/:id"), actions.updateById));
};
