var gulp        = require('gulp'),
    server      = require('tiny-lr')(),
    refresh     = require('gulp-livereload'),
    app         = require('./server/server.js'),
    lrPort      = 35729;

// collect paths
var paths = ['./client/src/**/*.js', './client/src/**/*.html', '!client/lib/'];

// serve express server
gulp.task('serve', function(){
  app.use(require('connect-livereload')());
  app.listen(app.get('port'));
});

// setup task to reload server on any file change in client path
gulp.task('client', function(){
  gulp.src(paths)
    .pipe(refresh(server));
});

// default task to serve then watch for changes
gulp.task('default', ['serve'], function(){
  server.listen(lrPort, function(err){
    if(err) {return console.error(err);}

    gulp.watch(paths, function(){
      gulp.run('client');
    });
  });
});