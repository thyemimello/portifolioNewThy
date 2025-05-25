var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

gulp.task("sass", () => {
  gulp
    .src("scss/**/*.scss")
    .pipe(sass())
    .on("error", (err) => {
      console.log(err.toString());

      this.emit("end");
    })
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task("serve", ["sass"], () => {
  browserSync.init({
    server: "./",
    port: 3001, // Changed port from 3000 to 3001
  });

  gulp.watch("scss/**/*.scss", ["sass"]);
  gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task("watch", () => {
  gulp.watch("scss/**/*.scss", ["sass"]);
});

// define the default gulp task
gulp.task("default", ["sass", "watch"]);
gulp.task("dev", ["serve"]);
