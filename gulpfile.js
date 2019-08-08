const gulp = require('gulp');
const sass = require('gulp-sass');
const php = require('gulp-connect-php');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

//php server
gulp.task('php', () => {
    php.server({base:'src', keepalive:true});
})

//live reload php server
gulp.task('connect-sync', () => {
    php.server({}, () => {
        browserSync.init(['**/*.php', 'src/style/*.sass', 'src/style/import/*.sass'],{
            baseDir: "src",
            notify:true,
            open: false,
            port: '8010',
            proxy: 'localhost/projects/emsePortal/src'
        });
    });

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src("src/style/style.sass")
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions', 'ie >= 7'],
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest("src/style"))
        .pipe(browserSync.stream())
        .on('error', function (err) {
            console.log(err.message + ' on line ' + err.lineNumber + ' in file : ' + err.fileName);
        })
});



//default command
gulp.task('default', ['connect-sync', 'sass:watch']);

gulp.task('sass:watch', () => {
    gulp.watch(['src/style/style.sass', "src/style/import/*.sass"], ['sass']);
});