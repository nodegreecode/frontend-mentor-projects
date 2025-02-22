const gulp = require("gulp");
const uglify = require("gulp-uglify");

gulp.task("minify-js", function () {
  return gulp.src("src/js/*.js").pipe(uglify()).pipe(gulp.dest("dist/js/"));
});
