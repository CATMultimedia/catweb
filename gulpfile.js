var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var fileInclude = require('gulp-file-include');
var concat = require('gulp-concat');

// **UIKit** scripts to concatenate and minify
var UIKitScripts = ['src/uikit/js/uikit.js', 'src/uikit/js/components/slideshow.js'];

// **Other** scripts to concatenate and minify
var scripts = ['src/js/main.js'];

gulp.task('sass', function() {
    return gulp.src('src/sass/main.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/css'));
});

gulp.task('uk-scripts', function() {
    return gulp.src(UIKitScripts)
        .pipe(concat('uikit.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('html', function() {
    return gulp.src(['src/index.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['sass', 'uk-scripts', 'scripts', 'html'], function() {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch(['src/index.html', 'src/partials/*.html'], ['html']);
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});
