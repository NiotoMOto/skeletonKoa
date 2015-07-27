

function populate(query, builder){
  if(query.populates){
    var populates = JSON.parse(query.populates);
    populates.forEach(function (attr){
      builder.populate(attr);
    });
  }
}

module.exports = function(model) {
  return {
    findAll: function*(next) {
      yield next;
      var error, result;
      try {
        var conditions = {};
        var query = this.request.query;
        if (query.conditions) {
          conditions = JSON.parse(query.conditions);
        }

        var builder = model.find(conditions);
        populate(query, builder);
        ['limit', 'skip', 'sort'].forEach(function(key){
          if (query[key]) {
            builder[key](query[key]);
          }
        });
        result = yield builder.exec();
        this.body = result;
        return this.body;
      } catch (_error) {
        error = _error;
        this.body = error;
        return this.body;
      }
    },
    findById: function*(next) {
      yield next;
      var error, result;
      try {
        result = yield model.findById(this.params.id).exec();
        this.body = result;
        return this.body;
      } catch (_error) {
        error = _error;
        this.body = error;
        return this.body;
      }
    },
    deleteById: function*(next) {
      yield next;
      var error, result;
      try {
        result = yield model.findByIdAndRemove(this.params.id).exec();
        this.body = result;
        return this.body;
      } catch (_error) {
        error = _error;
        this.body = error;
        return this.body;
      }
    },
    deleteAll: function*(next) {
        yield next;
        var error, result;
        try{
          result = yield model.remove({}).exec();
        } catch(_error) {
          error = _error;
          this.body = error;
          return this.body;
        }
    },
    replaceById: function*(next) {
      yield next;
      var error, newDocument, result;
      try {
        yield model.findByIdAndRemove(this.params.id).exec();
        newDocument = this.request.body;
        newDocument._id = this.params.id;
        result = yield model.create(newDocument);
        this.body = result;
        return this.body;
      } catch (_error) {
        error = _error;
        this.body = error;
        return this.body;
      }
    },
    updateById: function*(next) {
      yield next;
      var error, result;
      try {
        result = yield model.findByIdAndUpdate(this.params.id, this.request.body, {new: true}).exec();
        this.body = result;
        return this.body;
      } catch (_error) {
        error = _error;
        this.body = error;
        return this.body;
      }
    },
    create: function*(next) {
      yield next;
      var error, result;
      try {
        result = yield model.create(this.request.body);
        this.status = 201;
        this.body = result;
        return this.body;
      } catch (_error) {
        error = _error;
        this.body = error;
        return this.body;
      }
    }
  };
};
