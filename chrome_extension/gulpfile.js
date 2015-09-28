var gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    webpack = require('webpack-stream'),
    named = require('vinyl-named'),
    webpackConfig = require('./webpack.config.js');

gulp.task('clean', function() { 
  return gulp.src(['app/styles', 'app/scripts', 'app/images'], {read: false})
    .pipe(clean());
});

gulp.task('scripts', function() { 
  return gulp.src('src/scripts/*.js')
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('app/scripts/'))
    .pipe(notify({ message: 'scripts task complete' }));
});

gulp.task('default', ['clean', 'scripts'])

gulp.task('watch', ['default'], function() {
  gulp.watch('src/scripts/**/*.*', ['scripts']);
});
