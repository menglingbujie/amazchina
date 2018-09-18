
require("./gulp/watch");
const sequence = require('gulp-sequence');
const gulp = require('gulp');
gulp.task('dev', ['watch']);