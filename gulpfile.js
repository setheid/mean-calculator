const gulp = require('gulp');
const webpack = require('gulp-webpack');

gulp.task('bundle-test', function() {
  return gulp.src('./test/angular/unit-test.js')
    .pipe(webpack({output: {filename: 'test_bundle.js'}}))
    .pipe(gulp.dest('test/angular/'));
});

gulp.task('default', ['bundle-test']);
