const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const fileInclude = require('gulp-file-include');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

// **UIKit Only** scripts to concatenate and minify.
const UIKitScripts = [
    'src/uikit/js/uikit.js', 
    'src/uikit/js/components/slideshow.js'
    ];

// **Created Only** scripts to concatenate and minify.
const scripts = [
    'src/js/events.js'
    ];

gulp.task('sass', () => {
    return gulp.src('src/sass/main.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(cleanCSS())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('uk-scripts', () => {
    return gulp.src(UIKitScripts)
        .pipe(concat('uikit.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('scripts', () => {
    return gulp.src(scripts)
        .pipe(concat('main.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build/js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('html', () => {
    return gulp.src(['src/index.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('img', () => {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

gulp.task('default', ['sass', 'uk-scripts', 'scripts', 'html', 'img'], () => {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch(['src/index.html', 'src/partials/*.html'], ['html']);
});
