const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// Compilar SCSS
function compileSass() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
}

// Servidor + watch
function serve() {
  browserSync.init({
    server: "./",
    port: 3001,
  });

  gulp.watch("scss/**/*.scss", compileSass);
  gulp.watch("*.html").on("change", browserSync.reload);
}

// Watch isolado (opcional)
function watch() {
  gulp.watch("scss/**/*.scss", compileSass);
}

// Build task for production
function build(done) {
  compileSass();
  done();
}

// Tarefas nomeadas
exports.sass = compileSass;
exports.build = build;
exports.dev = gulp.series(compileSass, serve);
exports.watch = watch;
exports.serve = gulp.series(compileSass, serve);

// Default
exports.default = gulp.series(compileSass, watch);
exports.dev = exports.serve;
