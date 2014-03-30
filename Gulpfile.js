var gulp        = require('gulp'),
    server      = require('tiny-lr')(),
    refresh     = require('gulp-livereload'),
    app         = require('./server/server.js'),
    lrPort      = 35729;

var paths = ['./client/src/**/*.js', './client/src/**/*.html'];

gulp.task('serve', function(){
  app.use(require('connect-livereload')());
  app.listen(app.get('port'));
});

gulp.task('angular', function(){
  gulp.src(paths)
    .pipe(refresh(server));
});




gulp.task('default', ['serve'], function(){
  server.listen(lrPort, function(err){
    if(err) {return console.error(err);}

    gulp.watch(paths, function(){
      gulp.run('angular');
    });
  });
});