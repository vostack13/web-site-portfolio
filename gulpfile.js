const gulp = require('gulp');
const pug = require('gulp-pug');
const del = require('del');
const browserSync = require('browser-sync').create();

//styles
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/tempalates/**/*.pug',
        dest: 'build/assets/'
    },
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'build/assets/css/'
    }
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
}
 
// очистка
function clean() {
    return del(paths.root)
}

// следим за исходниками src
function watch() {
    gulp.watch(paths.styles.scr, styles)
    gulp.watch(paths.templates.scr, templates)
}

// следим за build и обновляем страницу в браузере
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload)
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;

// режим разработки
gulp.task('default', gulp.series(
    gulp.parallel(styles, templates),
    gulp.parallel(watch, server)
))
// сборка проекта
gulp.task('build', gulp.series(
    clean,
    gulp.parallel(styles, templates)
))