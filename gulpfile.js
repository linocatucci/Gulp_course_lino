var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

// FILE PATHS
var SCRIPTS_PATH = './public/scripts/**/*.js'; // the ** will also take all folders under scripts and look for .js files
var CSS_PATH = 'public/css/**/*.css';
var DIST_PATH = 'public/dist';
var TEMPLATES_PATH = 'templates/**/*.hbs';

// Handlebars plugins
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars'); // this is used to run the gulp-handlebars to run through a specific version of the handlebars lib. You need to have the gulp-handlebars task along with the library
var declare = require('gulp-declare'); // lets us declare new variables inside of gulp
var wrap = require('gulp-wrap'); // let's us wrap our files in a set of code
// gulp tasks:
// styles, min css, concatenating and prefix
// in here we use pump and the callback (cb) for error message,
// you can also use the package plumber, but pump does it automatically

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
      sourcemaps.init(),
      babel(),
      uglify(),
      concat('scripts.js'),
      sourcemaps.write(),
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

// templates task
gulp.task('templates', function(cb) {
  pump(
    [
      gulp.src(TEMPLATES_PATH),
      handlebars({
        handlebars: handlebarsLib
      }),
      wrap('Handlebars.template(<%= contents %>)'),
      declare({
        namespace: 'templates',
        noRedeclare: true
      }),
      concat('templates.js'),
      gulp.dest(DIST_PATH),
      livereload()
    ],
    cb
  );
});

// Default task
gulp.task('default', ['images', 'scripts', 'styles', 'templates'], function() {
  console.log('default Gulp task!');
});

gulp.task('watch', ['default'], function() {
  console.log('starting watch task!');
  require('./server.js'); // start the server and watch
  livereload.listen();
  gulp.watch([SCRIPTS_PATH], ['scripts']);
  //   gulp.watch([SCRIPTS_PATH, CSS_PATH], ['scripts', 'styles']); //dit kan ook in de array opgenomen worden
  // gulp.watch([CSS_PATH], ['styles']);
  gulp.watch(['./public/scss/**/*.scss'], ['styles']);
  gulp.watch([TEMPLATES_PATH], ['templates']);
});
