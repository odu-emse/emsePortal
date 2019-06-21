const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

//TODO: watch TSC file to compile into app.min.js on save
//TODO: change min version from -min to .min

//compile sass main file
gulp.task('sass', function() {
    return gulp.src(['build/style/style.sass'])
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 5 versions', 'ie >= 7'],
        cascade: false
    }))
    .pipe(gulp.dest('build/style'))
});

//minify css
gulp.task('minify-css', () => {
    return gulp.src('build/style/style.css')
      .pipe(cleanCSS({
          compatibility: 'ie8'
        }))
      .pipe(rename({
          suffix: '.min'
        }))
      .pipe(gulp.dest('src/style'));
});

gulp.task("tsc", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

//minify js
gulp.task('compress', function() {
    gulp.src('build/script/*.js')
      .pipe(minify({
            noSource : true
      }))
      .pipe(gulp.dest('src/script'))
});

//default command
gulp.task('default', ['sass', 'minify-css']);

gulp.task('sass:watch', function(){
    gulp.watch('build/style/style.sass', ['sass']);
});

gulp.task('deploy', ['sass', 'minify-css', 'tsc', 'compress']);