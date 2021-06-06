var gulp = require('gulp'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer');

const { watch, series } = require('gulp');

var less = require('gulp-less');
var path = require('path');
const browserSync = require('browser-sync').create();

gulp.task('less', function () {
  return gulp
    .src('less/main.less')
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')],
      }),
    )
    .pipe(gulp.dest('./css'));
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.parallel('less'), function () {
  browserSync.init({
    server: {
      baseDir: 'UKRC/',
    },
    notify: false,
  });
  gulp.watch('less/*.less', gulp.parallel('less'));
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('documents/*.html').on('change', browserSync.reload);
  gulp.watch('js/*.js').on('change', browserSync.reload);
});

exports.default = function () {
  browserSync.init({
    server: {
      baseDir: 'UKRC/',
    },
    notify: false,
  });

  // The task will be executed upon startup
  watch('less/*.less', gulp.parallel('less'));
  watch('*.html').on('change', browserSync.reload);
  watch('documents/*.html').on('change', browserSync.reload);
  watch('js/*.js').on('change', browserSync.reload);
};
// gulp.task('less', function () {
//   gulp
//     .src('less/*.less')
//     // gulp.src('../scss/*.scss')
//     .pipe(less({ outputStyle: 'expanded' }).on('error', less.logError))
//     .pipe(gulp.dest('css/'))
//     .pipe(browserSync.stream());
// });
// gulp.task('default', ['serve']);

// gulp.task('default', gulp.parallel('serve'), () =>
//   gulp
//     .src('css/main.css')
//     .pipe(
//       autoprefixer({
//         browsers: ['last 2 version', 'safari 5', 'ie 10', 'opera 12.1', 'ios 7', 'android 4'],
//         cascade: false,
//       }),
//     )
//     .pipe(gulp.dest('css/autoprefixer')),
// );
