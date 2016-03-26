'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var minify = require('gulp-minify-css');
var wrap = require('gulp-wrap');
var browserSync = require('browser-sync');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('browser-sync', ['build', 'sass'], function () {
  browserSync({
    server: {
      baseDir: '.'
    }
  });
});

gulp.task('sass', function () {
  gulp.src('./styles/main.scss')
    .pipe(sass()).on('error', handleError)
    .pipe(prefix())
    .pipe(csscomb())
    //.pipe(minify())
    .pipe(gulp.dest('./styles'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('build', function () {
  gulp.src('pages/*.html')
    .pipe(wrap({
      'src': 'layout/default.html'
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('rebuild', ['build'], function () {
  browserSync.reload();
});

gulp.task('watch', function () {
  gulp.watch(['pages/*.html', 'layout/*.html'], ['build']);
  gulp.watch(['styles/*.scss'], ['sass']);
});

gulp.task('default', ['browser-sync', 'watch']);