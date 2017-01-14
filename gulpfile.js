var gulp = require('gulp');
var mocha = require('gulp-mocha');
var util = require('gulp-util');
var fs = require('fs');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

require('gulp-release-it')(gulp);

var chai = require('chai');

//define a global function for use in test
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should;


gulp.task('default', [
    'jshint',
    'mocha'
]);

gulp.task('watch', function() {
    gulp.watch(['test/**/*.js'], ['mocha']);
    gulp.watch(['src/**/*.js'], ['jshint']);
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
    .pipe(jshint.reporter('jshint-stylish', {beep: true}));
});

gulp.task('uglify', function() {

    var options = {
        preserveComments: 'license'
    };

    return gulp.src(['src/**/*.js'])
      .pipe(uglify(options))
      .pipe(rename(function(path){
            path.basename += '.min';
      }))
      .pipe(gulp.dest('dist'));
});
