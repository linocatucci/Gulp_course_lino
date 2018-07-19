var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var SCRIPTS_PATH = './public/scripts/**/*.js'; // the ** will also take all folders under scripts and look for .js files
var CSS_PATH = 'public/css/**/*.css';
var DIST_PATCH = 'public/dist';
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

// gulp tasks:
// styles, min css, concatenating and prefix
// in here we use pump and the callback (cb) for error message,
// you can also use the package plumber
gulp.task('styles', function(cb) {
  console.log('starting styles!');
  pump(
    [
      gulp.src(['public/css/reset.css', CSS_PATH]),
      autoprefixer({
        browsers: ['last 2 versions']
      }),
      concat('styles.css'),
      minifyCSS(),
      gulp.dest(DIST_PATCH),
      livereload()
    ],
    cb
  );
});

// scripts, min js, concatenating and es6 in es5 code
// use pump for error handeling and propogating error messages
gulp.task('scripts', function(cb) {
  console.log('running Scripts and compress');
  pump(
    [gulp.src(SCRIPTS_PATH), uglify(), gulp.dest(DIST_PATCH), livereload()],
    cb
  );
});

// images compressing images
gulp.task('images', function() {
  console.log('images task compression');
});

// Default task
gulp.task('default', function() {
  console.log('default Gulp task!');
});

gulp.task('watch', function() {
  console.log('starting watch task!');
  require('./server.js'); // start the server and watch
  livereload.listen();
  gulp.watch([SCRIPTS_PATH], ['scripts']);
  //   gulp.watch([SCRIPTS_PATH, CSS_PATH], ['scripts', 'styles']); //dit kan ook in de array opgenomen worden
  gulp.watch([CSS_PATH], ['styles']);
});
