/*
© 2016-present Harald Rudell <c@haraldrudell.com> (http://haraldrudell.com)
All rights reserved.

This source code is licensed under the ISC-style license found in the
LICENSE file in the root directory of this source tree.
 */
const gulp = require('gulp')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const print = require('gulp-print')

const paths = {
  scripts: {
    src: 'src/**/*.js',
    dest: 'build',
  },
}

function transpile(done) {
  return gulp.src(paths.scripts.src, {since: gulp.lastRun(transpile)})
  .pipe(print())
  .pipe(sourcemaps.init())
  .pipe(babel())
  .on('error', e => {
    if (transpile.handleError) {
      if (e.codeFrame) {
        console.log('babel:', e.name, e.message)
        console.log(e.codeFrame)
      } else console.log('babel:', e && e.stack || e)
      done()
    } else done(e)
  })
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.scripts.dest))
}

exports.watch = () => {
  transpile.handleError = true
  gulp.watch(paths.scripts.src, transpile)
}
exports.transpile = transpile
