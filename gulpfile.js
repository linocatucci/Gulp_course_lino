var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var SCRIPTS_PATH = './public/scripts/**/*.js'; // the ** will also take all folders under scripts and look for .js files
var CSS_PATH = 'public/css/**/*.css';
var DIST_PATH = 'public/dist';
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

// gulp tasks:
// styles, min css, concatenating and prefix
// in here we use pump and the callback (cb) for error message,
// you can also use the package plumber

// sourcemaps will show the css files in your chrome dev tools as separate files (home and reset instead of styles.css)
// FOR REGULAR CSS
// gulp.task('styles', function(cb) {
//   console.log('starting styles!');
//   pump(
//     [
//       gulp.src(['public/css/reset.css', CSS_PATH]),
//       sourcemaps.init(),
//       autoprefixer({
//         browsers: ['last 2 versions']
//       }),
//       concat('styles.css'),
//       minifyCSS(),
//       sourcemaps.write(),
//       gulp.dest(DIST_PATCH),
//       livereload()
//     ],
//     cb
//   );
// });

// STYLES FOR SCSS
gulp.task('styles', function(cb) {
  console.log('starting styles!');
  pump(
    [
      gulp.src(['public/scss/styles.scss']),
      sourcemaps.init(),
      autoprefixer({
        browsers: ['last 2 versions']
      }),
      sass({ outputStyle: 'compressed' }),
      sourcemaps.write(),
      gulp.dest(DIST_PATH),
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
    [
      gulp.src(SCRIPTS_PATH),
      uglify(),
      concat('scripts.js'),
      gulp.dest(DIST_PATH),
      livereload()
    ],
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
  // gulp.watch([CSS_PATH], ['styles']);
  gulp.watch(['./public/scss/**/*.scss'], ['styles']);
});
