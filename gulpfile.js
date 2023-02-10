const {
  parallel,
  series,
} = require('gulp');

const requireDir = require('require-dir');
const tasks = requireDir('./tasks');
const include = tasks.include;
const browser = tasks.browser;
const watching = tasks.watching;
const compilePug = tasks.pug;
const clean = tasks.clean;
const webpack = tasks.webpack;
const sass = tasks.sass;
// exports.include = include;
// exports.browser = browser;
// exports.watching = watching;
// exports.compilePug = compilePug;

exports.default = series(clean, series(compilePug, include.html, sass, webpack), parallel(browser, watching))