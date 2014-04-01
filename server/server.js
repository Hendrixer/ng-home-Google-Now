var express  = require('express'),
    mongoose = require('mongoose'),
    app      = express();

require('./config/serverConfig.js')(app, express);
require('./config/db.js')(app, mongoose);
require('./cards/cardRoutes.js')(app);


exports = module.exports = app;