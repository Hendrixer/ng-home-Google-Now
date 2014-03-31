var gulp        = require('gulp'),
    server      = require('tiny-lr')(),
    refresh     = require('gulp-livereload'),
    mocha       = require('gulp-mocha'),
    stylus      = require('gulp-stylus');
    // app         = require('./server/server.js'),
    // lrPort      = 35729;

// collect paths
var paths = {
  client: {
    app: ['./client/src/**/*.js', './client/src/**/*.html', '!client/lib/'],
    styl: './client/styles/sty/style.styl',
    css: './client/styles/css/'
  },
  server: {
    specs: {
      cards: {
        unit: './server/cards/specs/*.js'
      }
    }
  }
};


gulp.task('stylus', function(){
    gulp.src(paths.client.styl)
      .pipe(stylus())
      .pipe(gulp.dest(paths.client.css));
});

gulp.task('test', function(){
  gulp.src(paths.server.specs.cards.unit)
    .pipe(mocha({reporter: 'spec'}));
});

// serve express server
// gulp.task('serve', function(){
//   app.use(require('connect-livereload')());
//   app.listen(app.get('port'));
// });

// setup task to reload server on any file change in client path
gulp.task('client', function(){
  gulp.src(paths.client.app)
    .pipe(refresh(server));
});

// default task to serve then watch for changes

// gulp.task('te', function(){
//   gulp.run(['cardUnit']);
// });

// gulp.task('default', ['serve'], function(){
//   server.listen(lrPort, function(err){
//     if(err) {return console.error(err);}

//     gulp.watch(paths.client.app, function(){
//       gulp.run('client');
//     });
//   });
// });