var gulp        = require('gulp'),
    server      = require('tiny-lr')(),
    refresh     = require('gulp-livereload'),
    mocha       = require('gulp-mocha'),
    stylus      = require('gulp-stylus'),
    notify      = require('gulp-notify'),
    lrPort      = 35729,
    httpServer, io, gulpSocket;

var paths = {
  styles: ['./client/styles/sty/*.styl'],

  assets: ['./client/assets/'],
  js: [
    './client/src/**/*.js',
    'Gulpfile.js'
  ],
  html: ['./client/src/**/*.html'],

  server: {
    js: ['./server/**/*.js'],
    specs: ['./server/cards/specs/*.js']
  }
};


gulp.task('serve', function(){
  var app = require('./server/server.js');
  app.use(require('connect-livereload')());
  httpServer  = require('http').createServer(app).listen(app.get('port'));
  io          = require('socket.io').listen(httpServer);
  io.set('log level', 1);
  io.sockets.on('connection', function(socket){
    gulpSocket = socket;
    require('./server/sockets/socketRoutes.js')(socket, io);
  });
});

gulp.task('test', function(){
  return gulp.src(paths.server.specs)
    .pipe(mocha({reporter: 'spec'}))
    .pipe(notify({message: "Specs ran"}));
});


function specChanged(path){
  return gulp.task('unit', function(){
    gulp.src(path)
      .pipe(mocha({reporter: 'spec'}))
      .pipe(notify({message: 'Card Unit test done'}));
  });
}

function stylesChange(path){
  return gulp.task('stylus', function(){
    gulp.src(path)
      .pipe(stylus())
      .pipe(gulp.dest('./client/styles/css/'))
      .pipe(refresh(server))
      .pipe(notify({message: 'Styles refreshed'}));
  });
}

function jsChange(path){
  return gulp.task('js', function(){
    gulp.src(path)
      .pipe(refresh(server))
      .pipe(notify({message: 'Angular refreshed'}));
  });
}

function htmlChange(path){
  return gulp.task('html', function(){
    gulp.src(path)
      .pipe(refresh(server))
      .pipe(notify({message: 'Views refreshed'}));
  });
}

gulp.task('watch', function(){
  server.listen(lrPort, function(err){
    if(err) {return console.error(err);}

    // gulp.watch(paths.js, ['js']);
    gulp.watch(paths.js, function(e){
      jsChange(e.path);
      gulp.run('js');
    });

    gulp.watch(paths.html, function(e){
      htmlChange(e.path);
      gulp.run('html');
    });

    gulp.watch(paths.styles, function(e){
      stylesChange(e.path);
      gulp.run('stylus');
    });

    gulp.watch(paths.server.specs, function(e){
      specChanged(e.path);
      gulp.run('unit');
    });
  });
});

gulp.task('default', ['serve', 'watch']);