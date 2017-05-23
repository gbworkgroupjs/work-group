var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');

gulp.task('serve', ['sass', 'pug'], function() {

    browserSync.init({
        server: "./"
    });
    gulp.watch('./*.pug', ['pug']);
    gulp.watch("sass/*.scss", ['sass']);
    gulp.watch("/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('pug', function() {
  return gulp.src('*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
})

gulp.task('default', ['serve']);