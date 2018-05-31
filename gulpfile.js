var gulp = require("gulp");
var minCss = require("gulp-minify-css");
var stylus = require("gulp-stylus");
var csscomb = require("gulp-csscomb");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");

var pug = require("gulp-pug");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");
// var clean = require("gulp-clean");

const paths = {
  stylus: ["./src/assets/styl/*.styl"],
  js: ["./src/assets/js/*.js"],
  css: ["./build/css/"],
  minjs: ["./build/js/"],
  pug: ["./src/**/*.html"],
  html: ["./build/"]
};

gulp.task("stylus", () => {
  return gulp
    .src(paths.stylus)
    .pipe(plumber())
    .pipe(
      stylus({
        "include css": true
      })
    )
    .pipe(csscomb())
    .pipe(
      autoprefixer({
        browsers: ["last 3 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest(paths.css[0]));
});

gulp.task("javascript", () => {
  return gulp
    .src(paths.js)
    .pipe(plumber())
    .pipe(
      babel({
        plugins: ["transform-class-properties"],
        "presets": ["env"],
        ignore: ['poper.js', 'bootstrap.min.js', 'jquery.3.3.1.min.js']
      })
    )
    .pipe(gulp.dest(paths.minjs[0]));
});

gulp.task("pug", () => {
  return gulp
    .src(paths.pug)
    // .pipe(pug())
    .pipe(gulp.dest(paths.html[0]));
});

gulp.task("watch", function() {
  gulp.watch(paths.stylus, ["stylus"]);
  gulp.watch(paths.pug, ["pug"]);
  gulp.watch(paths.js, ["javascript"]);
});

gulp.task("default", ["pug", "stylus", "javascript"]);
