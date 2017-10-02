'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('gulp-main-bower-files');
var browserSync = require('browser-sync').create();
var flatten = require('gulp-flatten');
var logger = require('gulp-logger');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');


gulp.task('watch', ['sass'], function() {
    browserSync.init({
        server: "./public",
        port: 3010
    });
    
    gulp.watch('./frontend/stylesheets/**/*.scss', ['sass']);
    gulp.watch('./frontend/javascripts/**/*.js', ['public']);
    gulp.watch('./public/index.html', browserSync.reload);
    gulp.watch('./public/**/*.js', browserSync.reload);
});

gulp.task('main-bower-files',  function() {
     return gulp.src('./bower.json')
        .pipe(mainBowerFiles(['**/*.js']))
        .pipe(flatten())
        .pipe(logger())
        .pipe(gulp.dest('./frontend/javascript'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    return gulp.src('./frontend/stylesheets/**/*.scss')
       .pipe(sourcemaps.init())
       .pipe(sass().on('error', sass.logError))
       .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
       .pipe(cleanCSS({compatibility: 'ie8'}))
       .pipe(sourcemaps.write('./maps'))
       .pipe(gulp.dest('./public/css'))
       .pipe(browserSync.stream());
});

gulp.task('images', function(){
  return gulp.src('frontend/images/*.png')
  .pipe(gulp.dest('./public/images'));
})

gulp.task('fonts', function () {
 return gulp.src(['./frontend/fonts/*.eot', './frontend/fonts/*.svg', './frontend/fonts/*.ttf', './frontend/fonts/*.woff'])
  .pipe(gulp.dest('./public/fonts'));
})

gulp.task('public', ['main-bower-files'], function () {
    return gulp.src('./frontend/javascript/*.js')
    .pipe(gulp.dest('./public/js'));
});
gulp.task('icons', function () { 
    return gulp.src(config.bowerDir + './fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('html', function () {
  gulp.src('./pablic/*.html')
  .pipe(browserSync.stream());
});

gulp.task('default', ['watch', 'public', 'images', 'fonts', 'html', 'sass', 'main-bower-files']);