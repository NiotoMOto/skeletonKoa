var requireDir = require('require-dir');
requireDir('./models');


mongoUrl = 'mongodb://localhost/test';
mongoose = require('mongoose');
mongoose.connect(mongoUrl);
