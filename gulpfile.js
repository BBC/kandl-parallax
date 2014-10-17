var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")(),
    bump = require('gulp-bump');

function build(stream, file) {
  return stream
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.concat(file))
    .pipe(gulp.dest('deploy'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('deploy'));
}

gulp.task('build.parallax', function() {
  return build(gulp.src([
      'LICENSE',
      'source/parallax.js',
      'source/requestAnimationFrame.js'
    ]), 'parallax.js');
});

gulp.task('clean', function() {
  return gulp.src(['deploy'], {read: false}).pipe(plugins.clean());
});

gulp.task('build', ['clean'], function() {
  gulp.start('build.parallax');
});

gulp.task('watch', function() {
  gulp.watch('source/**/*.js', ['build']);
});

gulp.task('bump', function(){
    gulp.src('./package.json')
        .pipe(bump({type:'patch'}))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build', 'bump']);
