const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const replace = require('gulp-replace');

function compileSass() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/styles'))
}

function compressImages() {
    return gulp.src('./src/images/**/*', { encoding: false })
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
}

function copyFonts() {
    return gulp.src('./assets/fonts/*.woff2')
        .pipe(gulp.dest('./dist/assets/fonts'))
}

function replaceHTML() {
    return gulp.src('./index.html')
        .pipe(replace('dist/', './'))
        .pipe(replace('src/', './'))
        .pipe(gulp.dest('dist/'))
}

exports.compress = compressImages;
exports.replace = replaceHTML;
exports.copyFonts = copyFonts;
exports.sass = compileSass;

exports.default = gulp.parallel(compileSass, compressImages, copyFonts, replaceHTML);

exports.watch = function () {
    gulp.watch('./src/styles/*.scss', { ignoreInitial: false }, gulp.series(compileSass));
    gulp.watch('./src/images/**/*', { ignoreInitial: false }, gulp.series(compressImages));
    gulp.watch('./assets/fonts/*', { ignoreInitial: false }, gulp.series(copyFonts));
    gulp.watch('./index.html', { ignoreInitial: false }, gulp.series(replaceHTML));
}