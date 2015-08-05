var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var spawn = require('child_process').spawn;
var $ = require('gulp-load-plugins')();

var paths = {
  tmp : './tmp',
  tmpFiles : './tmp/**/*',
  index: './app/index.dust',
  appJs: './app/scripts/**/*.js',
  nodeIndex : './index.js',
  nodeSrcipts: './serveur/**/*.js',
  serverJs: './server.js'
};
var node;

gulp.task('inject', ['clean'], function(){
  gulp.src(paths.index)
    .pipe($.inject(gulp.src([
      paths.appJs
    ], {read: false, addPrefix: 'app/'}), {relative: true, addPrefix: 'app'}))
    .pipe(wiredep({
      options: {
        cwd: 'app/'
      },
      cwd: 'app/',
      bowerJson: require('./bower.json'),
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('clean', function() {
  return gulp.src(paths.tmpFiles)
    .pipe($.clean());
});

gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['--harmony','index.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('watch', function(){
  gulp.watch([
    paths.nodeIndex,
    paths.nodeSrcipts,
    paths.serverJs,
  ], function() {
    gulp.run('server');
  });
});

gulp.task('runServeur', function(){
  gulp.run('server');
});

gulp.task('default',['runServeur', 'watch'], function() {
});

process.on('exit', function() {
    if (node){
       node.kill();
     }
});
