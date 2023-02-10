const {
  src,
  dest
} = require('gulp');
const gulp = require('gulp');
const webpack = require('webpack-stream');
const path = require('path');
const uglify = require('gulp-uglify');

module.exports = function compileJs() {
  return src('src/**/*.js')
    .pipe(dest('dist/'))
    .pipe(src('src/script.js'))
    .pipe(webpack({
      entry: './src/script.js',
      mode: 'development',
      watch: false,
      output: {
        filename: 'bundle.js',
      },
    }))
    .pipe(uglify())
    .pipe(dest('dist/'))
}