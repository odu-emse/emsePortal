const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

//compile sass main file
gulp.task('sass', function() {
    return gulp.src(['build/style/style.sass'])
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('build/style'))
    .pipe(browserSync.stream());
});

//minify css
gulp.task('minify-css', () => {
    return gulp.src('build/style/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('src/style'));
});

//watching and serving sass file
gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: './src'
    });

    gulp.watch(['build/style/style.sass'], ['sass']);
    gulp.watch(['src/*.php']).on('change', browserSync.reload);
});

//default command
gulp.task('default', ['serve']);