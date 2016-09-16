var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rsync = require('rsync-slim');
var concat = require('gulp-concat');
// var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');


var env_prod = true;

var src = 'src';
var dist = 'dist';
var bower = 'bower_components';
var distAssets = dist + '/assets';

var srcSass = src + '/assets/sass';
var srcSassFile = src + '/assets/sass/main.sass';
var distCss = dist + '/assets/css';

var srcJs = src + '/assets/js';
var srcJsFiles = [
  srcJs + '/ui-core.js',
  srcJs + '/test.js'
];
var distJs = dist + '/assets/js';
var distJsFile = 'ui-core.min.js';


gulp.task('sass', function() {
  return gulp.src(srcSassFile)
    .pipe(sass({
        includePaths: ['bower_components']
      })
      .on('error', sass.logError))
    .pipe(gulp.dest(distCss))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function() {
  gulp.watch(srcSass + '**/*.sass', ['sass']);
});

gulp.task('js', function(cb) {
  if (env_prod) {
    return gulp.src(srcJsFiles)
      .pipe(concat(distJsFile))
      .pipe(uglify({
        mangle: true,
        compress: {
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
        }
      }))
      .pipe(gulp.dest(distJs));
  } else {
    return gulp.src(srcJsFiles)
      .pipe(concat(distJsFile))
      .pipe(gulp.dest(distJs));
  }
});

gulp.task('js:watch', function() {
  gulp.watch(srcJs + '**/*.js', ['js']);
});


gulp.task('browser-sync', function() {
  browserSync.init({
    ghostMode: false,
    online: false,
    notify: false,
    server: {
      baseDir: dist
    }
  });
  gulp.watch([
      dist + '**/*.html',
      distJs + '**/*.js'
    ])
    .on('change', browserSync.reload);
});

gulp.task('jekyll', function(gulpCallBack) {
  var spawn = require('child_process').spawn;
  var jekyll = spawn('jekyll', ['build'], {
    stdio: 'inherit'
  });

  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});

gulp.task('jekyll:watch', function() {
  gulp.watch([
    src + '/**/*.md',
    src + '/**/*.html'
  ], ['jekyll']);
});

// gulp.task('imgmin', function() {
//   return gulp.src(imagesFolder + '**/*')
//     .pipe(imagemin({
//       progressive: true
//     }))
//     .pipe(gulp.dest(imagesFolder));
// });
//
// gulp.task('deploy', function() {
//   rsync({
//     src: 'wordpress/',
//     dest: 'stgsear1@akascia.com:~/www/aqvaluxe/',
//     // options: '--archive --delete --progress --compress --dry-run --human-readable',
//     options: '--archive --delete --progress --compress --human-readable --exclude .DS_Store'
//   });
// });

gulp.task('default', function() {
  console.log('No task defined as default');
});

gulp.task('env_dev', function() {
  env_prod = false;
});

gulp.task('env_prod', function() {
  env_prod = true;
});

gulp.task('dev', ['env_dev', 'jekyll', 'jekyll:watch', 'sass', 'sass:watch', 'js', 'js:watch', 'browser-sync']);
gulp.task('prod', ['env_prod', 'jekyll', 'jekyll:watch', 'sass', 'sass:watch', 'js', 'js:watch', 'browser-sync']);
