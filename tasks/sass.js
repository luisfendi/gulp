const {
  src,
  dest
} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

module.exports = function compileSass() {
  return src('src/**/*.scss')
    .pipe(sass())
    .pipe(dest('copy/'))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/'))
}