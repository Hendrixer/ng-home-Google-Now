var gulp        = require('gulp'),
    server      = require('tiny-lr')(),
    refresh     = require('gulp-livereload'),
    mocha       = require('gulp-mocha'),
    stylus      = require('gulp-stylus'),
    notify      = require('gulp-notify'),
    app         = require('./server/server.js'),
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
  gulp.src(paths.server.specs)
    .pipe(mocha({reporter: 'spec'}))
    .pipe(notify({message: 'Card Unit test done'}));
});


function stylesChange(path){
  gulp.task('stylus', function(){
    gulp.src(path)
      .pipe(stylus())
      .pipe(gulp.dest('./client/styles/css/'))
      .pipe(refresh(server))
      .pipe(notify({message: 'Styles refreshed'}));
  });
}

function jsChange(path){
  gulp.task('js', function(){
    gulp.src(path)
      .pipe(refresh(server))
      .pipe(notify({message: 'Angular refreshed'}));
  });
}

function htmlChange(path){
  gulp.task('html', function(){
    gulp.src(path)
      .pipe(refresh(server))
      .pipe(notify({message: 'Views refreshed'}));
  });
}


gulp.task('default', ['test', 'serve'], function(){
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
      stylesChange(e.paths);
      gulp.run('stylus')
    });
  });
});