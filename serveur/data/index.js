var requireDir = require('require-dir');

requireDir('./models');

mongoUrl = 'mongodb://localhost/coloc';
mongoose = require('mongoose');
mongoose.connect(mongoUrl);
