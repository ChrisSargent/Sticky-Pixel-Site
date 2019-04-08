var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var uglify = require('gulp-uglify');
var critical = require('critical');
var postcss = require('gulp-postcss');
var htmlmin = require('gulp-htmlmin');
var versionAppend = require('gulp-version-append');
var exec = require('child_process').exec;

var src = 'src';
var dist = 'dist';
var distAssets = dist + '/assets';

var srcSass = src + '/assets/sass';
var srcSassFile = src + '/assets/sass/main.sass';
var distCss = dist + '/assets/css';

var srcJs = src + '/assets/js';
var srcJsFiles = [
  'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
  srcJs + '/ui-scroll.js',
  srcJs + '/ui-core.js'
];
var distJs = dist + '/assets/js';
var distJsFile = 'ui-core.min.js';

var srcImgs = src + '/assets/img';
var srcFonts = src + '/assets/fonts';

var env = process.env.NODE_ENV || 'development';

gulp.task('sass', function() {
  return gulp
    .src(srcSassFile)
    .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
    .pipe(gulp.dest(distCss))
    .pipe(browserSync.stream());
});

gulp.task('css', ['sass'], function() {
  var autoprefixer, cssnano, mqpacker;
  if (env === 'production') {
    autoprefixer = require('autoprefixer');
    cssnano = require('cssnano');
    mqpacker = require('css-mqpacker');

    return gulp
      .src(distCss + '/*.css')
      .pipe(postcss([mqpacker({ sort: true }), autoprefixer(), cssnano()]))
      .pipe(gulp.dest(distCss));
  } else {
    return;
  }
});

gulp.task('css:watch', function() {
  gulp.watch(srcSass + '**/*.sass', ['css']);
});

gulp.task('js', function(cb) {
  if (env === 'production') {
    return gulp
      .src(srcJsFiles)
      .pipe(concat(distJsFile))
      .pipe(
        uglify({
          mangle: true,
          compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true
          }
        })
      )
      .pipe(gulp.dest(distJs));
  } else {
    return gulp
      .src(srcJsFiles)
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
      baseDir: dist,
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  });
  gulp.watch([dist + '**/*.html', distJs + '**/*.js']).on('change', browserSync.reload);
});

gulp.task('jekyll', function(cb) {
  var jekyllExec = process.platform === 'win32' ? 'jekyll.bat build' : 'bundle exec jekyll build';
  exec(jekyllExec, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('html:watch', function() {
  gulp.watch([src + '/**/*.md', src + '/**/*.html'], ['html']);
});

gulp.task('html', ['jekyll'], function() {
  if (env === 'production') {
    return gulp
      .src(dist + '/**/*.html')
      .pipe(versionAppend(['html', 'js', 'css', 'png', 'jpeg', 'jpg']))
      .pipe(
        htmlmin({
          collapseWhitespace: true,
          preserveLineBreaks: false,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true
        })
      )
      .pipe(gulp.dest(dist));
  } else {
    return;
  }
});

gulp.task('images', function() {
  return gulp
    .src(srcImgs + '/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle(),
        imageminJpegRecompress({
          accurate: true,
          progressive: true,
          strip: true,
          max: 88
        }),
        imagemin.optipng(),
        imagemin.svgo()
      ])
    )
    .pipe(gulp.dest(distAssets + '/img'));
});

gulp.task('fonts', function() {
  return gulp.src(srcFonts + '/**/*').pipe(gulp.dest(distAssets + '/fonts'));
});

gulp.task('critical', ['build:ci'], function(cb) {
  critical.generate({
    inline: true,
    base: dist + '/',
    src: 'index.html',
    dest: 'index.html',
    minify: true,
    dimensions: [
      {
        height: 568,
        width: 320
      },
      {
        height: 900,
        width: 1440
      }
    ],
    ignore: ['@font-face']
  });
});

gulp.task('build:watch', [
  'images',
  'fonts',
  'html',
  'html:watch',
  'css',
  'css:watch',
  'js',
  'js:watch',
  'browser-sync'
]);
gulp.task('build:ci', ['images', 'fonts', 'html', 'css', 'js']);

gulp.task('start', ['build:watch']);
// Gitlab ci can't run the critical css because needs puppeteer, disable for now
gulp.task('build', ['critical']);
