module.exports = function(app, mongoose){
  mongoose.connect(app.get('db uri'));
  var db = mongoose.connection;
  db.on('open', console.log.bind(console, 'connected to db'));
  db.on('error', console.error.bind(console, 'error connecting to db'));
};