var express  = require('express'),
    app      = express();


express.errorLogger = function(err, req, res, next){
  console.error(err.stack);
  next();
};

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.errorLogger);
app.use(app.router);
app.use(express.static(__dirname));

app.listen(5000);
console.log('listening on port 5000');