const {
  watch,
  series
} = require('gulp');
const include = require('./include');
const compilePug = require('./pug');
const webpack = require('./webpack');
const sass = require('./sass');
module.exports = function watching() {
  console.log('changes')
  watch('src/**/*.html', include.html);
  watch('src/**/*.js', series(include.js, webpack));
  watch('src/**/*.pug', compilePug);
  watch('src/**/*.scss', sass);
}