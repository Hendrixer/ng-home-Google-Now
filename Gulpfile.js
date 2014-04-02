var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    plumber     = require('gulp-plumber'),
    server      = require('tiny-lr')(),
    refresh     = require('gulp-livereload'),
    mocha       = require('gulp-mocha'),
    stylus      = require('gulp-stylus'),
    notify      = require('gulp-notify'),
    nodemon     = require('gulp-nodemon'),
    jshint      = require('gulp-jshint'),
    lrPort      = 35729;

var paths = {
  styles: ['./client/styles/sty/*.styl'],

  assets: ['./client/assets/'],
  scripts: [
    './client/src/app/app.js',
    './client/src/app/app.controller.js',
    './client/src/cards/card.js',
    './client/src/cards/card.service.js',
    './client/src/cards/card.directive.js',
    './client/src/cards/card.controller.js',
    './client/src/**/*.js'
  ],
  html: [
    './client/src/**/*.html',
    './client/src/index.html',
    './client/src/cards/directiveTemplates/*.html'
  ],

  server: {
    js: ['./server/**/*.js'],
    specs: ['./server/cards/specs/*.js']
  }
};


// Start express server with nodemon
gulp.task('serve', function(){
  nodemon({script: 'index.js'})
    .on('restart', function(){
      refresh(server);
    });
});


// lint the scripts
gulp.task('lint', function(){
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({message: 'jshint done'}));
});

// concat the scripts
gulp.task('scripts', function(){
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./client/'))
    .pipe(refresh(server))
    .pipe(notify({message: 'JS concatenated'}));
});

// test server specs
gulp.task('test', function(){
  return gulp.src(paths.server.specs)
    .pipe(mocha({reporter: 'spec'}))
    .pipe(notify({message: "Specs ran"}));
});

// build stylus
gulp.task('stylus', function(){
  return gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./client/styles/css'))
    .pipe(refresh(server))
    .pipe(notify({message: 'stylus done'}));
});

// refresh html
gulp.task('html', function(){
  return gulp.src(paths.html)
    .pipe(refresh(server))
    .pipe(notify({message: 'Views refreshed'}));
});

// build it all
gulp.task('build', ['stylus', 'scripts', 'lint']);

// livereolad server
gulp.task('lr', function(){
  server.listen(lrPort, function(err){
    if(err) {return console.error(err);}
  });
});

gulp.task('watch', function(){
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scripts, ['lint', 'scripts']);
  gulp.watch(paths.styles, ['stylus']);
});

gulp.task('default', ['test', 'build', 'lr', 'serve', 'watch']);