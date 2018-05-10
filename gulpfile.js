var gulp = require('gulp');
var notify = require('gulp-notify');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var connect = require('gulp-connect');

gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        port: 2715
    });
});

gulp.task('stylus', function () {
    return gulp.src('./css/*.styl')
    //   .pipe(concat('app.css'))
      .pipe(stylus())
      .pipe(gulp.dest('./build/css/'))
      .pipe(notify("Stylus was compiled correctly!"));
});

gulp.task('css-watch', ['stylus'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('watch', function () {
    gulp.watch('./css/*.styl', ['stylus']);
});

gulp.task('serve', ['stylus'], function() {

    browserSync.init({
        server: "."
    });

    // gulp.watch("css/*.styl", ['stylus']);
    // gulp.watch("./css/*.styl").on('change', ['stylus', browserSync.reload]);
    gulp.watch(["css/*.styl", "*.html"], ['css-watch']);
});

gulp.task('default', ['serve']);