module.exports = {
  errorLogger: function(err, req, res, next){
    console.error(err.stack);
    next(err);
  },

  errorAjax: function(err, req, res, next){
    if(req.xhr){
      res.send(401);
    }
    res.send(500);
  },

  enableCors: function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'Get, Post');
    if(req.method === 'OPTIONS') {res.send(200);}
    next();
  }
};