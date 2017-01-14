var gulp = require('gulp');
var mocha = require('gulp-mocha');
var util = require('gulp-util');
var chai = require('chai');

var fs = require('fs');

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
