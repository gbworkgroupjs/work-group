const gulp = require('gulp'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync').create(),
  pug = require('gulp-pug'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  csso = require('gulp-csso'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyJs = require('gulp-minify');

gulp.task('serve', ['sass', 'pug', 'concat', 'concatJs'], function() {

  browserSync.init({
        server: "./"
  });
  gulp.watch('./*.pug', ['pug']);
  gulp.watch("sass/*.scss", ['sass']);
  gulp.watch('css/*.css', ['concat']);
  gulp.watch('js/*.js', ['concatJs']);
  gulp.watch("/*.html").on('change', browserSync.reload);
})

gulp.task('sass', function() {
  return gulp.src("sass/*.scss")
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest("./css"))
  .pipe(browserSync.stream());
})

gulp.task('pug', function() {
  return gulp.src('*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream());
})

gulp.task('concat', function() {
  return gulp.src('css/*.css')
  .pipe(concat('style.min.css'))
  .pipe(csso({
    comments: false
  }))
  .pipe(gulp.dest('css/min'))
  .pipe(browserSync.stream());
       
})

gulp.task('imagemin', function() {
  return gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('images'))
})
 
gulp.task('concatJs', function() {
  return gulp.src('js/*.js')
  .pipe(concat('script.concat.js'))
  .pipe(minifyJs({
    ext:{
    min:'-min.js'
    },
    ignoreFiles: ['.combo.js', '-min.js']
    }))
  .pipe(gulp.dest('js/min'))
  .pipe(browserSync.stream());     
})

gulp.task('default', ['serve', 'imagemin']);