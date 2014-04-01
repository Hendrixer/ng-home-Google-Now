"use strict";
var middle = require('./middleware.js');

module.exports = function(app, express){
  app.configure('development', function(){
    app.set('db uri', process.env.MONGOHQ_URL || 'mongodb://localhost/homie');
    app.set('url', process.env.URL || 'http://localhost');
    app.set('port', process.env.PORT || 4000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(middle.enableCors);
    app.use(app.router);
    app.use(middle.errorLogger);
    app.use(middle.errorAjax);
    app.use(express.static(__dirname + '/../../client'));
  });

  app.configure('test', function(){
    app.set('db uri', 'mongodb://localhost/ngHomeTest');
    app.set('url', 'http://localhost');
    app.set('port', process.env.PORT || 4000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(middle.enableCors);
    app.use(app.router);
    app.use(middle.errorLogger);
    app.use(middle.errorAjax);
    app.use(express.static(__dirname + '/../../client'));
  });
};