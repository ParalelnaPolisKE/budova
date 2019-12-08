const gulp = require("gulp");
const nunjucks = require("gulp-nunjucks");
const autoprefixer = require("autoprefixer");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const newer = require("gulp-newer");
const rename = require("gulp-rename");
const cssnano = require("cssnano");
const browsersync = require("browser-sync").create();
const del = require("del");

const namesList = [
  "Katharina Bieniek",
  "Tiffani Fairman",
  "Lamont Sanjuan",
  "Humberto Daring",
  "Phuong Sirmans",
  "Horacio Krider",
  "Clinton Scala",
  "Douglass Landes",
  "Karisa Stangl",
  "Caroll Traverso",
  "Dewayne Shontz",
  "Buford Westra",
  "Slyvia Cora",
  "Malisa Shehan",
  "Jeremy Dejulio",
  "Jonnie Greig",
  "Christinia Ricketson",
  "Frida Earnest",
  "Hector Hutchens",
  "Patrice Barkett",
  "Yuonne Grunden",
  "Celestina Pollack",
  "Cleora Castilleja",
  "Theresa Shives",
  "Wilford Shrout",
  "Kimbra Manges",
  "Grayce Morais",
  "Merlyn Blocher",
  "Gidget Mcauley",
  "Neida Hagerty"
];

const namesListFormatted = namesList.join(`, `)

function bSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function clean() {
  return del(["./dist/assets/"]);
}

function images() {
  return gulp
    .src("./assets/img/**/*")
    .pipe(newer("./dist/assets/img"))
    .pipe(gulp.dest("./dist/assets/img"));
}

function compileCss() {
  return gulp
    .src("./assets/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./dist/assets/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./dist/assets/css/"))
    .pipe(browsersync.stream());
}

function css() {
  return gulp
    .src("./assets/css/**/*.css")
    .pipe(plumber())
    .pipe(gulp.dest("./dist/assets/css/"))
    .pipe(browsersync.stream());
}

function js() {
  return gulp
    .src(["./assets/js/**/*"])
    .pipe(plumber())
    .pipe(gulp.dest("./dist/assets/js/"))
    .pipe(browsersync.stream());
}

function templates() {
  return gulp
    .src("./src/**/*.html")
    .pipe(nunjucks.compile({ namesList, namesListFormatted }))
    .pipe(gulp.dest("./dist"));
}

function watchFiles() {
  gulp.watch("./assets/scss/**/*", compileCss);
  gulp.watch("./assets/css/**/*", css);
  gulp.watch("./assets/js/**/*", js);
  gulp.watch("./assets/img/**/*", images);
  gulp.watch("./src/**/*.html", templates);
}

const build = gulp.series(clean, gulp.parallel(css, compileCss, images, js));
const watch = gulp.parallel(watchFiles, bSync);

// export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;

// gulp.task("js", function() {
//   return gulp
//     .src("assets/js/*js")
//     .pipe(browserify())
//     .pipe(uglify())
//     .pipe(gulp.dest("dist/js"));
// });

// gulp.task("watch", ["js"], function(done) {
//   browserSync.reload();
//   done();
// });

// function styles() {
//   return gulp.src('./assets/scss/**/*.scss')
//       .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
//       .pipe(autoprefixer({ remove: false }))
//       .pipe(gulp.dest('./assets/css'))
//       .pipe(bsync.stream());
// }

// gulp.task("default", ["js"], function() {
//   browserSync.init({
//     server: {
//       baseDir: "./"
//     }
//   });

//   gulp.watch("assets/js/*.js", ["watch"]);
// });

// gulp.task("nunjucks", ["html"], function() {
//   return gulp.src('templates/*.html')
//         .pipe(nunjucks.compile())
//         .pipe(gulp.dest('dist'))
// })
