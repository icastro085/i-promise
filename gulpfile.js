var gulp = require('gulp');
var mocha = require('gulp-mocha');
var util = require('gulp-util');
var fs = require('fs');
var jshint = require('gulp-jshint');

require('gulp-release-it')(gulp);

gulp.task('default', function() {
    gulp.watch(['test/**/*.js'], ['mocha']);
});

gulp.task('mocha', function() {

    return gulp.src(['test/**/*.js'], { read: false })
        .pipe(mocha({
            reporter: 'list',
            require: [],
            globals: ['setTimeout']
        }))
        .on('error', util.log);
});

gulp.task('jshint', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
