const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

//TODO: watch TSC file to compile into app.min.js on save
//TODO: change min version from -min to .min

//compile sass main file
gulp.task('sass', () => {
    return gulp.src(['src/style/style.sass'])
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 5 versions', 'ie >= 7'],
        cascade: false
    }))
    .pipe(gulp.dest('src/style'))
});

//minify css
gulp.task('minify-css', () => {
    return gulp.src('src/style/style.css')
      .pipe(cleanCSS({
          compatibility: 'ie8'
        }))
      .pipe(rename({
          suffix: '.min'
        }))
      .pipe(gulp.dest('src/style'));
});

gulp.task("tsc",  () => {
    return tsProject.src()
    //TODO: figure out this whole mess of compressing TSC and adding .min suffix to it
        .pipe(tsProject())
        .js.pipe(gulp.dest("src/script"))
        //.pipe(uglify())
});

//minify js
gulp.task('compress', () => {
    gulp.src('src/script/*.js')
      .pipe(minify({
            noSource : true
      }))
      .pipe(gulp.dest('src/script'))
});

//default command
gulp.task('default', ['sass', 'minify-css']);

gulp.task('sass:watch', () => {
    gulp.watch('src/style/style.sass', ['sass']);
});

gulp.task('tsc:watch', ['tsc'], () => {
    gulp.watch('src/script/app.ts', ['tsc']);
});

gulp.task('deploy', ['sass', 'minify-css', 'tsc', 'compress']);