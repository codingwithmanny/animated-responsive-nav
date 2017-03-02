'use strict';

/* Main modules and variables
------------------------------------------ */
var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var distFolder = './dist';
var srcFolder = './app'

/* Main modules and variables
------------------------------------------ */
gulp.task('connect', function()
{
  connect.server({
    port: 3000,
    root: distFolder,
    livereload: true
  });
});

/* Jade watching and copying
------------------------------------------ */
gulp.task('pug:watch', function()
{
  gulp.watch(['./app/*.pug'], ['pug']);
});

gulp.task('pug', function ()
{
  gulp.src( srcFolder + '/*.pug' )
  .pipe(pug())
  .pipe(gulp.dest( distFolder + '/' ))
  .pipe(connect.reload());
});

/* HTML watching and copying
------------------------------------------ */
gulp.task('html:watch', function()
{
  gulp.watch([ distFolder + '/*.html' ], ['html']);
});

gulp.task('html', function ()
{
  return gulp.src( distFolder + '/*.html' )
    .pipe(connect.reload());
});

/* Sass/CSS watching and copying
------------------------------------------ */
gulp.task('sass:watch', function ()
{
  gulp.watch( srcFolder + '/assets/sass/**/*.scss', ['sass']);
});

gulp.task('sass', function ()
{
  return gulp.src( srcFolder + '/assets/sass/**/*.scss' )
    .pipe(sass({'outputStyle': 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest( distFolder + '/assets/css' ))
    .pipe(connect.reload());
});

/* Js watching and copying
------------------------------------------ */
gulp.task('js:watch', function ()
{
  gulp.watch( srcFolder + '/assets/javascripts/**/*.js', ['js']);
});

gulp.task('js', function()
{
  return gulp.src(
    [
      srcFolder + '/assets/javascripts/**/*.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest( distFolder + '/assets/js') )
    .pipe(connect.reload());
});

/* Images copying
------------------------------------------ */
gulp.task('images', function ()
{
  return gulp.src( srcFolder + '/assets/images/**/*.*' )
    .pipe(gulp.dest( distFolder + '/assets/images' ))
    .pipe(connect.reload());
});

/* Fonts copying
------------------------------------------ */
gulp.task('fonts', function ()
{
  return gulp.src([
    srcFolder + '/assets/fonts/**/*.*',
    './node_modules/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest( distFolder + '/assets/fonts' ))
    .pipe(connect.reload());
});

/* Removes folder contents
------------------------------------------ */
gulp.task('clean', function () {
    return gulp.src( distFolder + '/*', {read: false})
    .pipe(clean());
});

/* Gulp default task
------------------------------------------ */
gulp.task('default',
  [
    'connect',
    'pug',
    'pug:watch',
    'html',
    'html:watch',
    'sass',
    'sass:watch',
    'images',
    'js',
    'js:watch',
    'fonts',
  ]
);

/* Gulp build task
------------------------------------------ */
gulp.task('build',
  [
    'clean',
    'pug',
    'sass',
    'images',
    'js',
    'fonts',
  ]
);
