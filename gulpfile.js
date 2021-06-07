var gulp = require('gulp'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer');

const { watch, series } = require('gulp');

var less = require('gulp-less');
var path = require('path');
const browserSync = require('browser-sync').create();

gulp.task('less', function () {
  return gulp
    .src('app/less/main.less')
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')],
      }),
    )
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.parallel('less'), function () {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
    notify: false,
  });
  gulp.watch('app/less/*.less', gulp.parallel('less'));
  gulp.watch('app/*.html').on('change', browserSync.reload);
  gulp.watch('app/js/*.js').on('change', browserSync.reload);
});

exports.default = function () {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
    notify: false,
  });

  // The task will be executed upon startup
  watch('app/less/*.less', gulp.parallel('less'));
  watch('app/*.html').on('change', browserSync.reload);
  // watch('UKRC/documents/*.html').on('change', browserSync.reload);
  watch('app/js/*.js').on('change', browserSync.reload);
};
