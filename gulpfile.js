const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

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
    return gulp.src('build/style/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('src/style'));
});

//default command
gulp.task('default', ['sass', 'minify-css']);

gulp.task('sass:watch', function(){
    gulp.watch('build/style/style.sass', ['sass']);
});

gulp.task('mini', ['minify-css']);