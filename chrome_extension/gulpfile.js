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

deps = [
  'node_modules/jquery/dist/**',
  'node_modules/urijs/src/**',
  'node_modules/amazeui/dist/**'
]

gulp.task('copy_deps', function() { 
  return gulp.src(deps, {base: './node_modules'})
    .pipe(gulp.dest('app/plugins/'));
});

gulp.task('scripts', function() { 
  return gulp.src('src/scripts/*.js')
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('app/scripts/'))
    .pipe(notify({ message: 'scripts task complete' }));
});

gulp.task('default', ['clean', 'copy_deps', 'scripts'])

gulp.task('watch', ['default'], function() {
  gulp.watch('src/scripts/**/*.*', ['scripts']);
});
