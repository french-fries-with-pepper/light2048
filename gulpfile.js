let gulp = require("gulp");
let browserSync = require("browser-sync").create();
let autoprefixer = require("gulp-autoprefixer");
let cleanCSS = require("gulp-clean-css");

gulp.task("prefix", function() {
  return gulp
    .src("./src/style.css")
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "cover 99.5%"],
        cascade: true
      })
    )
    .pipe(gulp.dest("./"));
});

gulp.task("minify-css", () => {
  return gulp
    .src("./src/style.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./"));
});

gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./src/*.css", gulp.parallel("prefix"));
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./*.css").on("change", browserSync.reload);
});

gulp.task("default", gulp.parallel("prefix", "serve"));
