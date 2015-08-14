var passport = require('koa-passport');
var user = require('./data/models/user');

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy((username, password, done) => {
  user.find({name: username}, (err, user) => {
    if(err){
      done(null, false);
    }else{
        user.verifyPassword(password, valid => {
          if(valid){
            done(null, user);
          }else{
            donne(null, false);
          }
        });
    }

  });
}));
