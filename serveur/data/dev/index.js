var spend = require('../models/spend'),
    colocation = require('../models/colocation'),
    user = require('../models/user');

function populate(next){
  console.log('Poulate database ....');
  // Drop database
  return Promise.all([
    spend.remove({}),
    colocation.remove({}),
    user.remove({})
  ]).then(() =>{
    // Populate
    return Promise.all([
      user.create({name : 'Antoine', password: 'antoine'}),
      user.create({name : 'Sébastien', password: 'seb'}),
      colocation.create({name : 'Poissy'})
    ]).then((args) => {
      return Promise.all([
        spend.create({creator: args[0]._id, toUser: args[1], colocation: args[2]._id, montant: 900}),
        spend.create({creator: args[1]._id, toUser: args[0], colocation: args[2]._id, montant: 200}),
        spend.create({creator: args[1]._id, toUser: args[0], colocation: args[2]._id, montant: 150})
      ]).then(() => {
          console.log('populate database finised');
      });
    });
  });
}

module.exports.populate = populate;
