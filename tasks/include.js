const {
  src,
  dest
} = require('gulp');

const gulp = require('gulp')
const include = require('gulp-include');
const htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');

module.exports.js = function includeJs() {
  return src('src/**/*.js')
    .pipe(dest('copy/'))
}

module.exports.html = function includeHtml() {
  return src('src/**/*.html')
    .pipe(include())
    .pipe(dest('copy/'))
    .pipe(src('src/index.html'))
    .pipe(dest('dist/'))
    .pipe(src('src/index.html'))
    .pipe(include())
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/'))
}