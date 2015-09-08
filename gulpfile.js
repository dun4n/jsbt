var gulp = require('gulp');
var child_process = require('child_process');

gulp.task('transform', function(done) {
  child_process.spawn('babel', ['src', '--out-dir', 'dist'], {
    stdio: 'inherit',
    cwd: process.cwd()
  }).on('close', function() {
    done();
  });
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*', ['transform']);
});
