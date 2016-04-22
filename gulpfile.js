var gulp = require('gulp');
var minimist = require('minimist');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var args = minimist(process.argv.slice(2));

gulp.task('deploy', function() {
  var remotePath = '/home/stephen';
  var conn = ftp.create({
    host: args.ip,
    user: args.user,
    password: args.password,
    log: gutil.log
  });

  gulp.src(['*, !node_modules'])
    .pipe(conn.newer(remotePath))
    .pipe(conn.dest(remotePath));

});
