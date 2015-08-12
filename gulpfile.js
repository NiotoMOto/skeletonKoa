var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var spawn = require('child_process').spawn;
var $ = require('gulp-load-plugins')();
var livereload = require('gulp-livereload');
var babel = require('gulp-babel');
var jade = require('gulp-jade');
var path = require('path');

var paths = {
  tmp: './tmp',
  gulpFile: './gulpFile.js',
  tmpFiles: './tmp/**/*',
  index: './app/index.jade',
  appJs: './app/**/*.js',
  appCss: './app/**/*.css',
  jade: './app/**/*.jade',
  appBowers: './app/bower_components/**/*',
  bowerJson: './bower.json',
  nodeIndex: './index.js',
  nodeSrcipts: './serveur/**/*.js',
  frontHtml: './views/**/*.dust',
  serverJs: './server.js',
  except: function(path) {
    return '!' + path;
  }
};
var node;

gulp.task('inject', function() {
  return gulp.src(paths.index)
    .pipe(jade())
    .pipe($.inject(gulp.src([
      paths.appJs,
      paths.appCss,
      paths.except(paths.appBowers)
    ], {
      read: false
    }), {
      relative: true,
      addPrefix: 'app'
    }))
    .pipe(wiredep({
      bowerJson: require('./bower.json'),
      directory: 'app/bower_components',
      fileTypes: {
       html: {
         replace: {
           js: '<script src="app/{{filePath}}"></script>',
           css: '<link rel="stylesheet" href="app/{{filePath}}" />'
         }
       }
     }
    }))
    .pipe(gulp.dest(paths.tmp))
    .pipe(livereload());
});

gulp.task('clean', function() {
  return gulp.src(paths.tmpFiles)
    .pipe($.clean());
});

gulp.task('appCss', function() {
  return gulp.src([
      paths.appCss,
      paths.except(paths.appBowers)
    ])
    .pipe(gulp.dest(paths.tmp))
    .pipe(livereload());
});

gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['--harmony', 'index.js'], {
    stdio: 'inherit'
  });
  node.on('close', function(code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('frontHtml', function() {
  return gulp.src([paths.frontHtml])
    .pipe(livereload());
});

gulp.task('appJs', function() {
  return gulp.src([
      paths.appJs,
      paths.except(paths.appBowers)
    ])
    .pipe(babel())
    .pipe(gulp.dest(paths.tmp))
    .pipe(livereload());
});

gulp.task('jade', function() {
  return gulp.src([
      paths.jade,
      paths.except(paths.index)
    ])
    .pipe(jade())
    .pipe(gulp.dest(paths.tmp))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch([
    paths.nodeIndex,
    paths.nodeSrcipts,
    paths.serverJs,
  ], function() {
    gulp.run('server');
  });

  gulp.watch([
    paths.frontHtml
  ], ['frontHtml']);

  gulp.watch([
    paths.appJs
  ], ['appJs']);

  gulp.watch([
    paths.appCss
  ], ['appCss']);

  gulp.watch([
    paths.jade
  ], ['jade']);

  gulp.watch([
    paths.bowerJson,
    paths.index,
  ], ['inject']);

});

gulp.task('runServeur', function() {
  return gulp.run('server');
});

gulp.task('default', [
  'appCss',
  'appJs',
  'inject',
  'jade',
  'runServeur',
  'watch'
], function() {});

process.on('exit', function() {
  if (node) {
    node.kill();
  }
});
