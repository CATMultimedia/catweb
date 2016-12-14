var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var fileInclude = require('gulp-file-include');

gulp.task('sass', function() {
    return gulp.src('src/sass/main.scss')
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/css'));
});

gulp.task('uglify-js', function() {
    pump([
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('build/js')
    ]);
});

gulp.task('html', function() {
  return gulp.src(['src/index.html'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['sass', 'uglify-js', 'html'], function() {
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['uglify-js']);
	gulp.watch(['src/index.html', 'src/partials/*.html'], ['html']);
	gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});
