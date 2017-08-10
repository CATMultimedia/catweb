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
    'src/js/events.js',
    'src/js/main.js',
    'src/js/header.js'
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

gulp.task('index-layout', () => {
    return gulp.src('src/index.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('about-layouts', () => {
        gulp.src(['src/about/*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build/about'));
});

gulp.task('academics-layouts', () => {
        gulp.src(['src/academics/*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build/academics'));
});

gulp.task('campus-layouts', () => {
        gulp.src(['src/campus/*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build/campus'));
});

gulp.task('join-layouts', () => {
        gulp.src(['src/join/*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build/join'));
});

gulp.task('quicklinks-layouts', () => {
        gulp.src(['src/quicklinks/*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build/quicklinks'));
});

gulp.task('resources-layouts', () => {
        gulp.src(['src/resources/*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('build/resources'));
});

gulp.task('img', () => {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('default', ['sass', 'uk-scripts', 'scripts', 'index-layout', 'about-layouts', 'academics-layouts', 
                    'campus-layouts', 'join-layouts', 'quicklinks-layouts', 'resources-layouts', 
                    'img', 'fonts'], () => {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch(['src/index.html','src/partials/*.html', 'src/academics/*.html', 'src/campus/*.html', 'src/join/*.html', 'src/quicklinks/*.html', 'src/resources/*.html', ], ['index-layout']);
    
    gulp.watch(['src/about/*.html', 'src/partials/*.html'], ['about-layouts']);
    gulp.watch(['src/academics/*.html', 'src/partials/*.html'], ['academics-layouts']);
    gulp.watch(['src/campus/*.html', 'src/partials/*.html'], ['campus-layouts']);
    gulp.watch(['src/join/*.html', 'src/partials/*.html'], ['join-layouts']);
    gulp.watch(['src/quicklinks/*.html', 'src/partials/*.html'], ['quicklinks-layouts']);
    gulp.watch(['src/resources/*.html', 'src/partials/*.html'], ['resources-layouts']);
});
