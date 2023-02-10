const {
  src
} = require('gulp');
const gulp = require('gulp');
const clean = require('gulp-clean');

module.exports = function cleaning() {
  return src('./dist/', {
      read: false
    })
    .pipe(clean())
    .pipe(src('./copy/'))
    .pipe(clean())
}