const pug = require('gulp-pug');
const {
  src,
  dest
} = require('gulp');

module.exports = function compilePug() {
  return src('./src/*.pug')
    .pipe(pug({}))
    .pipe(dest('./src/'))
};