var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var minifyCss = require('gulp-clean-css');
var csso = require('gulp-csso');

gulp.task('serve', ['sass', 'pug', 'concat'], function() {

    browserSync.init({
        server: "./"
    });
    gulp.watch('./*.pug', ['pug']);
    gulp.watch("sass/*.scss", ['sass']);
    gulp.watch('css/*.css', ['concat']);
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

gulp.task('concat', function() {
    return gulp.src('css/*.css')
            .pipe(concat('style.min.css'))
            .pipe(minifyCss())
            .pipe(gulp.dest('tmp'))
            .pipe(browserSync.stream());
       
})

gulp.task('default', ['serve']);