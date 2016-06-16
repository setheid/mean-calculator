const gulp = require('gulp');
const webpack = require('gulp-webpack');
const mocha = require('gulp-mocha');

gulp.task('angular-test', function() {
  return gulp.src('./test/angular/unit-test.js')
    .pipe(webpack({output: {filename: 'test_bundle.js'}}))
    .pipe(gulp.dest('test/angular/'));
});

gulp.task('node-test', () => {
  return gulp.src('./test/node/node-test.js')
  .pipe(mocha());
});

gulp.task('default', ['node-test']);
